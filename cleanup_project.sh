#!/bin/bash

# cleanup_project.sh
# Automated cleanup script for Node/React projects
# Usage: DRY_RUN=true ./cleanup_project.sh (default)
#        DRY_RUN=false ./cleanup_project.sh (destructive)

set -e

# Configuration
BRANCH_PREFIX="cleanup/auto"
TIMESTAMP=$(date +"%Y%m%d-%H%M")
BRANCH_NAME="${BRANCH_PREFIX}-${TIMESTAMP}"
REPORT_FILE="cleanup-report.json"
DRY_RUN=${DRY_RUN:-true}

echo "========================================================"
echo "   Automated Cleanup Script"
echo "   Mode: DRY_RUN=${DRY_RUN}"
echo "========================================================"

# 1. Git Setup
if [ -z "$(git status --porcelain)" ]; then
  echo "Working directory clean."
else
  echo "Warning: Working directory not clean. Stashing changes..."
  git stash save "Pre-cleanup stash ${TIMESTAMP}"
fi

echo "Creating branch ${BRANCH_NAME}..."
git checkout -b "${BRANCH_NAME}"

# 2. Install Tools
echo "Installing analysis tools (depcheck, madge, purgecss, glob, md5-file)..."
# Using --no-save to avoid modifying package.json
npm install --no-save depcheck madge purgecss glob md5-file typescript

# 3. Create Node.js Worker Script
cat << 'EOF' > cleanup_worker.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const madge = require('madge');
const md5File = require('md5-file');
const { PurgeCSS } = require('purgecss');

const DRY_RUN = process.env.DRY_RUN === 'true';
const REPORT_FILE = 'cleanup-report.json';

// Configuration
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', 'coverage', 'migrations', 'scripts', 'public'];
const SAFE_DIRS = ['src/config', 'config'];
const PLACEHOLDER_KEYWORDS = ['placeholder', 'demo', 'temp', 'example', 'sample', 'TODO'];

// Helper to find projects
function findProjects() {
    const projects = [];
    if (fs.existsSync('package.json')) projects.push('.');
    const subdirs = fs.readdirSync('.').filter(d => fs.statSync(d).isDirectory());
    subdirs.forEach(d => {
        if (fs.existsSync(path.join(d, 'package.json')) && !IGNORE_DIRS.includes(d)) {
            projects.push(d);
        }
    });
    return [...new Set(projects)]; // Unique
}

// Helper to check if file is safe
function isSafe(filePath) {
    const relative = path.relative(process.cwd(), filePath);
    if (SAFE_DIRS.some(safe => relative.includes(safe))) return true;
    if (relative.includes('.env')) return true;
    if (relative.endsWith('index.html')) return true;
    return false;
}

async function analyzeProject(projectDir) {
    console.log(`Analyzing project: ${projectDir}`);
    const report = {
        unusedFiles: [],
        unusedCss: [],
        placeholders: [],
        duplicates: [],
        errors: []
    };

    const srcDir = path.join(projectDir, 'src');
    if (!fs.existsSync(srcDir)) {
        console.log(`No src directory found in ${projectDir}, skipping deep analysis.`);
        return report;
    }

    // 1. Unused Modules (Madge)
    try {
        console.log('  Running Madge for unused files...');
        const res = await madge(srcDir, {
            fileExtensions: ['js', 'jsx', 'ts', 'tsx'],
            excludeRegExp: [/\.test\./, /\.spec\./, /setupTests/]
        });
        const orphans = res.orphans();
        orphans.forEach(file => {
            const fullPath = path.join(srcDir, file);
            if (!isSafe(fullPath)) {
                report.unusedFiles.push({
                    file: fullPath,
                    reason: 'Orphan file (no dependents)'
                });
            }
        });
    } catch (e) {
        report.errors.push(`Madge error: ${e.message}`);
    }

    // 2. Unused CSS Files
    try {
        console.log('  Scanning for unused CSS files...');
        const cssFiles = glob.sync(`${srcDir}/**/*.css`);
        const codeFiles = glob.sync(`${srcDir}/**/*.{js,jsx,ts,tsx}`);
        
        // Build map of imports
        const imports = new Set();
        codeFiles.forEach(f => {
            const content = fs.readFileSync(f, 'utf8');
            // Simple regex for imports
            const matches = content.match(/['"](.+\.css)['"]/g);
            if (matches) {
                matches.forEach(m => {
                    const importPath = m.replace(/['"]/g, '');
                    // Resolve path roughly
                    const resolved = path.resolve(path.dirname(f), importPath);
                    imports.add(resolved);
                });
            }
        });

        cssFiles.forEach(f => {
            const abs = path.resolve(f);
            // Check if imported (exact match or basename match for simplicity if path resolution fails)
            // Being conservative: if basename is imported anywhere, keep it.
            const basename = path.basename(f);
            const isImported = Array.from(imports).some(i => i === abs || i.endsWith(basename));
            
            if (!isImported && !isSafe(f)) {
                 report.unusedCss.push({
                    file: f,
                    reason: 'CSS file not imported in JS/TS'
                });
            }
        });
    } catch (e) {
        report.errors.push(`CSS scan error: ${e.message}`);
    }

    // 3. Placeholders
    try {
        console.log('  Scanning for placeholders...');
        const allFiles = glob.sync(`${srcDir}/**/*.{js,jsx,ts,tsx,html,css}`);
        allFiles.forEach(f => {
            if (isSafe(f)) return;
            const content = fs.readFileSync(f, 'utf8');
            // Check filename
            if (PLACEHOLDER_KEYWORDS.some(k => f.toLowerCase().includes(k))) {
                report.placeholders.push({ file: f, reason: 'Filename contains placeholder keyword' });
                return;
            }
            // Check content (first 500 chars or comments)
            // Simple check
            if (PLACEHOLDER_KEYWORDS.some(k => content.includes(k))) {
                 // Refine: check if it's a comment or component name?
                 // For now, just report it.
                 report.placeholders.push({ file: f, reason: 'Content contains placeholder keyword' });
            }
        });
    } catch (e) {
        report.errors.push(`Placeholder scan error: ${e.message}`);
    }

    // 4. Duplicate Images
    try {
        console.log('  Scanning for duplicate images...');
        const images = glob.sync(`${projectDir}/**/*.{png,jpg,jpeg,gif,svg,webp}`, { ignore: '**/node_modules/**' });
        const hashMap = {};
        images.forEach(f => {
            try {
                const hash = md5File.sync(f);
                if (!hashMap[hash]) hashMap[hash] = [];
                hashMap[hash].push(f);
            } catch (e) {}
        });

        Object.keys(hashMap).forEach(hash => {
            if (hashMap[hash].length > 1) {
                report.duplicates.push({
                    files: hashMap[hash],
                    reason: 'Duplicate image content'
                });
            }
        });
    } catch (e) {
        report.errors.push(`Duplicate scan error: ${e.message}`);
    }

    return report;
}

async function main() {
    const projects = findProjects();
    console.log(`Found projects: ${projects.join(', ')}`);

    const fullReport = {};
    let totalCandidates = 0;

    for (const p of projects) {
        const rep = await analyzeProject(p);
        fullReport[p] = rep;
        totalCandidates += rep.unusedFiles.length + rep.unusedCss.length + rep.placeholders.length + rep.duplicates.length;
    }

    fs.writeFileSync(REPORT_FILE, JSON.stringify(fullReport, null, 2));
    console.log(`\nReport saved to ${REPORT_FILE}`);
    console.log(`Total candidates found: ${totalCandidates}`);

    // Summary
    Object.keys(fullReport).forEach(p => {
        const r = fullReport[p];
        if (r.unusedFiles.length > 0) console.log(`[${p}] Unused Files: ${r.unusedFiles.length}`);
        if (r.unusedCss.length > 0) console.log(`[${p}] Unused CSS: ${r.unusedCss.length}`);
        if (r.placeholders.length > 0) console.log(`[${p}] Placeholders: ${r.placeholders.length}`);
        if (r.duplicates.length > 0) console.log(`[${p}] Duplicates: ${r.duplicates.length}`);
    });

    if (!DRY_RUN) {
        console.log('\nPerforming deletion...');
        // Deletion Logic
        Object.keys(fullReport).forEach(p => {
            const r = fullReport[p];
            
            // Delete Unused Files
            r.unusedFiles.forEach(item => {
                try { fs.unlinkSync(item.file); console.log(`Deleted: ${item.file}`); } catch(e) {}
            });

            // Delete Unused CSS
            r.unusedCss.forEach(item => {
                try { fs.unlinkSync(item.file); console.log(`Deleted: ${item.file}`); } catch(e) {}
            });

            // Duplicates: Keep first, delete others
            r.duplicates.forEach(item => {
                const [keep, ...remove] = item.files;
                remove.forEach(f => {
                     try { fs.unlinkSync(f); console.log(`Deleted duplicate: ${f} (kept ${keep})`); } catch(e) {}
                });
            });
            
            // Placeholders: Do NOT auto-delete, just report. Too risky.
            if (r.placeholders.length > 0) {
                console.log(`[${p}] Skipped deleting ${r.placeholders.length} placeholder files (manual review recommended).`);
            }
        });
    } else {
        console.log('\nDRY RUN: No files deleted.');
    }
}

main().catch(console.error);
EOF

# 4. Run Analysis
node cleanup_worker.js

# 5. Cleanup Worker
rm cleanup_worker.js

# 6. Git Commit (if not dry run)
if [ "$DRY_RUN" = "false" ]; then
    if [ -n "$(git status --porcelain)" ]; then
        echo "Committing changes..."
        git add .
        git commit -m "chore(cleanup): remove unused files [auto]"
        echo "Cleanup complete. Branch: ${BRANCH_NAME}"
    else
        echo "No changes to commit."
    fi
else
    echo "Dry run complete. Check ${REPORT_FILE}."
fi
