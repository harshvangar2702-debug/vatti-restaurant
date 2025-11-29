# 🎬 Visual User Guide - Review Submission & Password Change

## Part 1: How Users Submit Reviews 👥

### Step 1: Open Website
```
Open browser: http://localhost:5173
                    ↓
        Website loads successfully
```

### Step 2: Navigate to Reviews Section
```
Scroll down the website
        ↓
    Look for "What Our Guests Say" section
        ↓
    You'll see review carousel with 5 sample reviews
```

### Step 3: Find the Review Form
```
Carousel showing reviews:
┌────────────────────────────────────┐
│  ⭐⭐⭐⭐⭐ Sarah's Review            │
│  "Absolutely incredible dining!"    │
│                [Dots: • ○ ○ ○ ○]    │
└────────────────────────────────────┘
        ↓ (Scroll down)
┌────────────────────────────────────┐
│  Share Your Experience              │
│  "We'd love to hear from you!"      │
│                                     │
│  [Review Form Appears Here]         │
└────────────────────────────────────┘
```

### Step 4: Fill Out the Form
```
┌─────────────────────────────────────┐
│  Share Your Experience              │
├─────────────────────────────────────┤
│                                     │
│  Your Name                          │
│  [___________________________]       │
│  Your Name Here                     │
│                                     │
│  Your Email                         │
│  [___________________________]       │
│  your@email.com                     │
│                                     │
│  Your Rating                        │
│  ☆ ☆ ☆ ☆ ☆  (Click to rate)      │
│                                     │
│  Your Review                        │
│  ┌────────────────────────────────┐ │
│  │ Tell us about your experience! │ │
│  │ Delicious food, great service, │ │
│  │ perfect atmosphere!            │ │
│  └────────────────────────────────┘ │
│  Character count: 45/500             │
│                                     │
│        [Submit Review]              │
│                                     │
└─────────────────────────────────────┘
```

### Step 5: Submit Review
```
Click [Submit Review]
        ↓
Form validates:
├─ Name at least 2 characters? ✓
├─ Valid email format? ✓
├─ Rating selected (1-5)? ✓
├─ Review 10-500 characters? ✓
        ↓
All valid? Submit!
        ↓
POST /api/review
        ↓
Database saves review with approved: false
        ↓
Display success message:
┌────────────────────────────────────┐
│ ✓ Thank you! Your review has been  │
│   submitted and is pending approval│
└────────────────────────────────────┘
```

### Step 6: Review Appears After Approval
```
User submits review
        ↓ (Review pending)
Admin approves review
        ↓
Review appears in carousel on website
        ↓
Next visitor sees your review!
```

---

## Part 2: How Admins Change Password 🔐

### Step 1: Login to Admin Panel
```
Open browser: http://localhost:5173/admin.html
                    ↓
        Admin Login Page appears
┌─────────────────────────────────────┐
│      Admin Login                    │
├─────────────────────────────────────┤
│  Email:                             │
│  [admin@vatti.com                 ] │
│                                     │
│  Password:                          │
│  [••••••••••••••••                ] │
│                                     │
│        [Login]                      │
└─────────────────────────────────────┘
```

### Step 2: Enter Credentials
```
Email:    admin@vatti.com
Password: Admin@123456
        ↓
Click [Login]
        ↓
Admin Panel loads
```

### Step 3: Navigate to Settings
```
Admin Panel opens:
┌───────────────────────┬─────────────────────┐
│  SIDEBAR              │  MAIN CONTENT       │
├───────────────────────┤                     │
│ ✓ Dashboard           │  Dashboard content  │
│   Reservations        │                     │
│   Menu                │                     │
│   Promotions          │                     │
│   Reviews             │                     │
│                       │                     │
│ ┌─────────────────┐   │                     │
│ │ Logged in as:   │   │                     │
│ │ Admin User      │   │                     │
│ │                 │   │                     │
│ │ [Settings]  ← NEW   │                     │
│ │ [Logout]        │   │                     │
│ └─────────────────┘   │                     │
└───────────────────────┴─────────────────────┘
```

### Step 4: Click Settings Button
```
In sidebar (bottom):
┌─────────────────────────────────┐
│  Logged in as:                  │
│  Admin User                     │
│                                 │
│  [Settings] ← Click Here        │
│  [Logout]                       │
└─────────────────────────────────┘
        ↓
Click [Settings]
        ↓
Settings Page loads
```

### Step 5: View Current Admin Info
```
Settings Page:
┌─────────────────────────────────────┐
│  Account Settings                   │
│  Manage your admin account          │
│                                     │
│  Admin Information                  │
│  ┌────────────────────────────────┐ │
│  │ Admin Name                     │ │
│  │ Admin User                     │ │
│  │                                │ │
│  │ Email Address                  │ │
│  │ admin@vatti.com                │ │
│  └────────────────────────────────┘ │
│                                     │
│  Change Password                    │
│  [Password change form below]       │
└─────────────────────────────────────┘
```

### Step 6: Fill Password Change Form
```
Change Password Section:
┌─────────────────────────────────────┐
│  Current Password                   │
│  [••••••••••••••••                ] │
│  Admin@123456                       │
│                                     │
│  New Password                       │
│  [••••••••••••••••                ] │
│  NewPassword@123456                 │
│                                     │
│  Confirm New Password               │
│  [••••••••••••••••                ] │
│  NewPassword@123456                 │
│                                     │
│  ☐ Show passwords                   │
│                                     │
│     [Change Password]               │
│                                     │
│  ℹ️ After changing, you will be     │
│  logged out and need to re-login   │
└─────────────────────────────────────┘
```

### Step 7: Submit Password Change
```
Form validation:
├─ Current password field filled? ✓
├─ New password 8+ characters? ✓
├─ Confirm password field filled? ✓
├─ Passwords match exactly? ✓
├─ New ≠ Current password? ✓
        ↓
All valid? Submit!
        ↓
Click [Change Password]
        ↓
Frontend sends: PUT /api/auth/change-password
        ↓
Backend:
├─ Finds user by email
├─ Verifies current password
├─ Hashes new password
├─ Saves to database
        ↓
Backend responds: ✓ Success
        ↓
Display message:
┌────────────────────────────────────┐
│ ✓ Password changed successfully!  │
│                                    │
│   Please log in with your new      │
│   password.                        │
│   [Auto-logout in 2 seconds]       │
└────────────────────────────────────┘
```

### Step 8: Auto-Logout
```
Success message shows
        ↓ (Wait 2 seconds)
Automatically logged out
        ↓
Redirected to Login page
        ↓
Login page loads:
┌─────────────────────────────────────┐
│      Admin Login                    │
├─────────────────────────────────────┤
│  Email: [                         ] │
│  Password: [                      ] │
│        [Login]                      │
└─────────────────────────────────────┘
```

### Step 9: Login with New Password
```
Enter credentials:
Email:    admin@vatti.com
Password: NewPassword@123456 (NEW)
        ↓
Click [Login]
        ↓
✓ Login successful!
        ↓
Admin Panel loads
        ↓
Back to Dashboard
```

### Step 10: Old Password No Longer Works
```
Try to login with old password:
Email:    admin@vatti.com
Password: Admin@123456 (OLD)
        ↓
Click [Login]
        ↓
❌ Error: Invalid credentials
        ↓
Use new password instead
```

---

## 📱 Mobile View

### Review Form (Mobile)
```
┌─────────────────────┐
│ Share Your          │
│ Experience          │
├─────────────────────┤
│                     │
│ Your Name           │
│ [_____________]     │
│                     │
│ Your Email          │
│ [_____________]     │
│                     │
│ Rating              │
│ ★ ★ ★ ★ ★          │
│                     │
│ Your Review         │
│ ┌─────────────────┐ │
│ │ Tell us about   │ │
│ │ your experience │ │
│ │ ...             │ │
│ └─────────────────┘ │
│ 0/500 chars         │
│                     │
│ [Submit Review]     │
│                     │
└─────────────────────┘
```

### Settings Form (Mobile)
```
┌─────────────────────┐
│ Account Settings    │
│                     │
│ Admin User          │
│ admin@vatti.com     │
│                     │
│ Change Password     │
│                     │
│ Current Password    │
│ [_____________]     │
│                     │
│ New Password        │
│ [_____________]     │
│                     │
│ Confirm Password    │
│ [_____________]     │
│                     │
│ ☐ Show             │
│                     │
│ [Change Password]   │
│                     │
└─────────────────────┘
```

---

## 🎨 Color Scheme

### Success (Green)
```
Background: #dcfce7 (light green)
Text: #166534 (dark green)
Border: #86efac (medium green)

Example: ✓ Password changed successfully
```

### Error (Red)
```
Background: #fee2e2 (light red)
Text: #991b1b (dark red)
Border: #fca5a5 (medium red)

Example: ❌ Current password is incorrect
```

### Primary Button
```
Background: #f97316 (orange)
Hover: #ea580c (darker orange)
Text: white
Disabled: #a3a3a3 (gray)

Example: [Submit Review]
```

### Secondary Button
```
Background: #374151 (dark gray)
Hover: #4b5563 (lighter gray)
Text: white

Example: [Settings]
```

---

## ✨ Animations & Effects

### Star Rating
```
On hover: ★ ★ ★ ☆ ☆ (yellow highlights up to hover point)
On click: ★ ★ ★ ☆ ☆ (locked to clicked position)
Scale: Slightly enlarges on hover
```

### Form Submission
```
Before: [Submit Review]
During: [Submitting...] (disabled, grayed out)
After Success: ✓ Success message (green)
After Error: ❌ Error message (red)
```

### Success Message
```
Appears: Fade in (0.3s)
Duration: Shows for 5 seconds
Disappears: Fade out (0.3s)
```

---

## 🔄 Common User Paths

### Path 1: Happy Path (User Submits Review)
```
Website → Reviews Section → Fill Form → Submit
                                          ↓
                                    ✓ Success
                                    ↓ (pending)
Admin Panel → Reviews → Approve → Website Shows Review
```

### Path 2: Happy Path (Admin Changes Password)
```
Admin Panel → Settings → Fill Form → Submit
                                      ↓
                                 ✓ Success
                                 ↓ (Auto logout)
                            Login Page → Login with new password
```

### Path 3: Error Path (Invalid Form)
```
Website → Reviews Form → Try to submit with validation errors
                                      ↓
                                 ❌ Form prevents submit
                                 ↓ (Show error message)
                                 Fix errors
                                 ↓
                                 ✓ Submit works
```

### Path 4: Error Path (Wrong Password)
```
Admin Panel → Settings → Enter wrong current password
                                      ↓
                              Click [Change Password]
                                      ↓
                         ❌ Error: "Current password incorrect"
                                      ↓
                              Try again with correct password
                                      ↓
                                 ✓ Success
```

---

## 📊 State Transitions

### Review Form State
```
IDLE
  ↓ (User starts typing)
VALIDATING
  ↓ (User fills all fields correctly)
VALID
  ↓ (User clicks submit)
SUBMITTING
  ↓ (Server processes)
SUCCESS or ERROR
  ↓ (Display message)
IDLE or RESET (ready for new submission)
```

### Admin Settings State
```
LOGGED_IN
  ↓ (Click Settings)
VIEWING_SETTINGS
  ↓ (Start typing password)
EDITING
  ↓ (All fields valid)
READY_TO_SUBMIT
  ↓ (Click Change Password)
SUBMITTING
  ↓ (Server verifies and updates)
SUCCESS
  ↓ (Show message)
AUTO_LOGOUT (2 seconds)
  ↓
LOGIN_PAGE
```

---

## 🎯 Key Takeaways

1. **Review Submission**
   - Easy 4-field form
   - Shows success message immediately
   - Admin must approve before showing

2. **Password Change**
   - Current password verification required
   - Auto-logout for security
   - New password must be 8+ characters

3. **Validation**
   - Both client-side and server-side
   - Clear error messages
   - Form prevents invalid submission

4. **Security**
   - Passwords hashed with bcryptjs
   - Current password verified
   - Auto-logout after changes

---

## 📞 Need Help?

See detailed guides:
- **Quick Start**: QUICK_START_GUIDE.md
- **Technical Details**: IMPLEMENTATION_SUMMARY.md
- **Architecture**: ARCHITECTURE_DIAGRAM.md
- **All Changes**: CHANGELOG.md

---

**Version**: 1.0
**Last Updated**: 2024
