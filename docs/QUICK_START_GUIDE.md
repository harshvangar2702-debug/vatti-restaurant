# 🚀 Quick Start Guide - Review Submission & Password Change

## Feature #1: User Review Submission

### 🎯 How Users Submit Reviews

1. **Open the website:**
   - URL: `http://localhost:5173`

2. **Scroll to the "What Our Guests Say" section**
   - You'll see a carousel with sample reviews
   - Scroll down below the carousel

3. **Fill the "Share Your Experience" Form:**
   - **Your Name:** Enter your name
   - **Your Email:** Enter a valid email
   - **Your Rating:** Click on stars (1-5) to rate
   - **Your Review:** Write your feedback (10-500 characters)

4. **Click "Submit Review"**
   - You'll see a success message: *"Thank you! Your review has been submitted and is pending approval."*
   - Your review is now saved to the database

### 📋 Admin Review Moderation

1. **Go to Admin Panel:**
   - URL: `http://localhost:5173/admin.html`
   - Email: `admin@vatti.com`
   - Password: `Admin@123456`

2. **Click "Reviews" in the sidebar**

3. **View Pending Reviews:**
   - Filter by "Pending" to see new user submissions
   - Each review shows: Name, Email, Rating (stars), Comment, Date

4. **Approve or Reject:**
   - Click "Approve" to show review on website
   - Click "Reject" to remove the review
   - Rejected reviews are deleted from database

---

## Feature #2: Admin Password Change

### 🔐 How Admin Changes Password

1. **Login to Admin Panel:**
   - URL: `http://localhost:5173/admin.html`
   - Email: `admin@vatti.com`
   - Password: `Admin@123456`

2. **Click "Settings" button in sidebar**
   - Button appears below the admin info at bottom

3. **Go to "Change Password" Section**
   - See current admin name and email

4. **Fill Password Change Form:**
   - **Current Password:** Enter your existing password
   - **New Password:** Enter new password (min 8 characters)
   - **Confirm New Password:** Re-enter the new password

5. **Validation Rules:**
   - New password must be different from current
   - Both password fields must match
   - Minimum 8 characters required
   - All fields required

6. **Click "Change Password"**
   - See success message: *"Password changed successfully! Please log in with your new password."*
   - Automatically logged out after 2 seconds

7. **Login with New Password**
   - Use new password on next login
   - Old password will no longer work

---

## 🧪 Test Scenario

### Complete Workflow:

```
1. USER SUBMITS REVIEW
   ↓
   [Website] → Review Form → Submit
   ↓
   [Database] Review saved with approved: false
   
2. ADMIN MODERATES REVIEW
   ↓
   [Admin Panel] → Reviews → Pending → View submission
   ↓
   Approve/Reject decision
   
3. ADMIN CHANGES PASSWORD
   ↓
   [Admin Panel] → Settings → Change Password
   ↓
   [Database] Password updated (hashed)
   ↓
   [Login Screen] → Login with new password
```

---

## 📱 API Endpoints

### User Reviews:
```bash
# Submit a review (from website)
POST http://localhost:5001/api/review
{
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5,
  "comment": "Great food and service!",
  "approved": false
}

# Get all reviews (for admin)
GET http://localhost:5001/api/review

# Update review status (approve/reject)
PUT http://localhost:5001/api/review/:id
{
  "approved": true
}
```

### Admin Password:
```bash
# Change password
PUT http://localhost:5001/api/auth/change-password
{
  "email": "admin@vatti.com",
  "currentPassword": "Admin@123456",
  "newPassword": "NewPassword@123"
}
```

---

## 🔑 Test Credentials

**Admin Email:** `admin@vatti.com`  
**Admin Password:** `Admin@123456` (can be changed)

After changing the password, use your new password for subsequent logins.

---

## ⚠️ Common Issues & Solutions

### Issue: Review won't submit
**Solution:** 
- Check if review is 10+ characters
- Verify all fields are filled
- Make sure backend is running on port 5001

### Issue: Can't access admin panel
**Solution:**
- Backend must be running: `npm run dev` in `/backend`
- Navigate to `http://localhost:5173/admin.html`
- Use correct credentials

### Issue: Password change fails
**Solution:**
- Current password must be correct
- New password must be 8+ characters
- Password confirmation must match exactly
- Backend server must be running

### Issue: Backend connection error
**Solution:**
```bash
# In backend directory:
npm run dev
# Should show: "Server running on port 5001"
```

---

## 📊 Data Flow Diagram

```
REVIEW SUBMISSION:
┌─────────────────┐
│  Website User   │
└────────┬────────┘
         │ Fills form
         ↓
┌─────────────────────────────┐
│ ReviewSubmission Component  │
│ - Name, Email, Rating, Text │
└────────┬────────────────────┘
         │ POST /api/review
         ↓
┌─────────────────────────────┐
│  Backend Express Server     │
│ - Validates input           │
│ - Saves to MongoDB          │
└────────┬────────────────────┘
         │ Review saved (approved: false)
         ↓
┌─────────────────────────────┐
│   MongoDB Database          │
│ - Reviews Collection        │
└─────────────────────────────┘

PASSWORD CHANGE:
┌─────────────────┐
│  Admin User     │
└────────┬────────┘
         │ Enters Settings
         ↓
┌─────────────────────────────┐
│ AdminSettings Component     │
│ - Current password field    │
│ - New password field        │
└────────┬────────────────────┘
         │ PUT /api/auth/change-password
         ↓
┌─────────────────────────────┐
│  Backend Express Server     │
│ - Verifies old password     │
│ - Hashes new password       │
│ - Updates in MongoDB        │
└────────┬────────────────────┘
         │ Password updated
         ↓
┌─────────────────────────────┐
│   MongoDB Database          │
│ - User Collection           │
│ - Password field updated    │
└─────────────────────────────┘
```

---

## 🎨 UI Components Created

### ReviewSubmission.tsx
- Located: `frontend/src/components/ReviewSubmission.tsx`
- Features:
  - Form with validation
  - Star rating selector
  - Character counter
  - Success/error messages
  - Loading state

### AdminSettings.tsx
- Located: `frontend/src/components/Admin/AdminSettings.tsx`
- Features:
  - Admin info display
  - Password change form
  - Show/hide password toggle
  - Form validation
  - Success/error messages
  - Auto-logout on success

---

## ✅ Verification Checklist

After implementing, verify:

- [ ] Website shows review form below carousel
- [ ] Review form has all fields (name, email, rating, comment)
- [ ] Can submit review successfully
- [ ] Review appears in Admin Panel > Reviews (Pending)
- [ ] Admin can approve/reject reviews
- [ ] Admin Settings button appears in sidebar
- [ ] Can access Settings page
- [ ] Password change form has all fields
- [ ] Can change password successfully
- [ ] Auto-logout after password change
- [ ] Old password doesn't work on next login
- [ ] New password works on next login

---

## 📞 Support

If you encounter any issues:
1. Check backend is running (`npm run dev` in `/backend`)
2. Check frontend is running (`npm run dev` in `/frontend`)
3. Verify MongoDB is running on `localhost:27017`
4. Check browser console for error messages (F12)
5. Check backend console for server errors

---

**Version:** 1.0  
**Last Updated:** 2024  
**Features Added:** User Review Submission, Admin Password Change
