"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.changePassword = exports.getProfile = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User_1.default({ name, email, password });
        const salt = yield bcryptjs_1.default.genSalt(10);
        if (user.password) {
            user.password = yield bcryptjs_1.default.hash(user.password, salt);
        }
        yield user.save();
        const payload = { user: { id: user.id } };
        jsonwebtoken_1.default.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (error) {
        res.status(500).send('Server error');
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (!user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = { user: { id: user.id } };
        jsonwebtoken_1.default.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
            if (err)
                throw err;
            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.login = login;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch (error) {
        res.status(500).send('Server Error');
    }
});
exports.getProfile = getProfile;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, currentPassword, newPassword } = req.body;
    try {
        // Find user by email
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Verify current password
        if (!user.password) {
            return res.status(400).json({ message: 'Unable to verify password' });
        }
        const isMatch = yield bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        // Check if new password is different from current
        const isSamePassword = yield bcryptjs_1.default.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({ message: 'New password must be different from current password' });
        }
        // Hash and update new password
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(newPassword, salt);
        yield user.save();
        res.json({ message: 'Password changed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.changePassword = changePassword;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        // Check if user exists
        const user = yield User_1.default.findOne({ email });
        // For security, always return success message even if user doesn't exist
        // This prevents email enumeration attacks
        if (!user) {
            return res.json({ message: 'If an account exists with this email, a password reset link has been sent.' });
        }
        // Generate a reset token (valid for 1 hour)
        const resetToken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
        // Configure email transporter
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'your-email@gmail.com',
                pass: process.env.EMAIL_PASSWORD || 'your-app-password',
            },
        });
        // Email template
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: email,
            subject: 'Vatti Restaurant - Password Reset Request',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #E67E22; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Vatti Restaurant</h2>
          </div>
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <h3 style="color: #333;">Password Reset Request</h3>
            <p style="color: #666; font-size: 16px;">Hi ${user.name},</p>
            <p style="color: #666; font-size: 16px;">We received a request to reset your password. Click the button below to create a new password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #E67E22; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Reset Password
              </a>
            </div>

            <p style="color: #666; font-size: 14px;">Or copy this link:</p>
            <p style="color: #0066cc; word-break: break-all; font-size: 13px;">${resetLink}</p>

            <p style="color: #666; font-size: 14px; margin-top: 20px;">This link will expire in 1 hour.</p>
            
            <p style="color: #999; font-size: 13px; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
              If you didn't request this password reset, please ignore this email or contact support.
            </p>
          </div>
          <div style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
            <p>© 2025 Vatti Restaurant. All rights reserved.</p>
          </div>
        </div>
      `,
        };
        // Send email
        try {
            yield transporter.sendMail(mailOptions);
            console.log(`Password reset email sent to ${email}`);
        }
        catch (emailError) {
            console.error('Error sending email:', emailError);
            // Don't expose email error to client, but still return success message
            console.log(`Email setup: Make sure to set EMAIL_USER and EMAIL_PASSWORD environment variables`);
        }
        // Return success message
        res.json({
            message: 'If an account exists with this email, a password reset link has been sent.'
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
exports.forgotPassword = forgotPassword;
