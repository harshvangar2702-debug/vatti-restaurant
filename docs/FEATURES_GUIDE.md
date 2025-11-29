# Vatti Restaurant - Features Guide

## 📝 HOW USERS CAN GIVE REVIEWS

### Current Setup:
- The Reviews section on the website displays mock/sample reviews
- There is currently **NO public review submission form**

### To Enable Users to Submit Reviews:

1. **Add a "Submit Review" Form** at the bottom of the Reviews section
2. Form should include:
   - Name (text input)
   - Email (email input)
   - Rating (star selector 1-5)
   - Review Text (textarea)
   - Submit Button

3. **User Flow:**
   - User fills the review form on the website
   - Submits review to backend API
   - Review is saved to database with `approved: false` status
   - Admin approves review in Admin Panel > Reviews
   - Approved reviews appear in the carousel

4. **Backend Endpoint:**
   ```
   POST /api/review
   {
     "name": "John Doe",
     "email": "john@example.com",
     "rating": 5,
     "comment": "Great food!",
     "approved": false
   }
   ```

---

## 🔐 HOW ADMIN CAN CHANGE PASSWORD

### Current Setup:
- Admin logs in with credentials: `admin@vatti.com` / `Admin@123456`
- Password is stored hashed in MongoDB User document
- There is currently **NO password change feature**

### To Enable Admin Password Change:

1. **Add "Settings" or "Account" Section** to Admin Panel
   - Navigate to Admin Panel > Settings
   - Or add a dropdown menu in the top-right corner with admin name

2. **Change Password Form Should Include:**
   - Current Password (password input for verification)
   - New Password (password input)
   - Confirm New Password (password input)
   - Change Password Button

3. **Validation:**
   - Verify current password is correct
   - New password must be different from current
   - New password minimum 8 characters
   - Passwords must match

4. **Backend Endpoint Needed:**
   ```
   PUT /api/auth/change-password
   {
     "email": "admin@vatti.com",
     "currentPassword": "Admin@123456",
     "newPassword": "NewPassword@123"
   }
   ```
   - Verify current password using bcrypt
   - Hash new password with bcrypt
   - Update User document in MongoDB

---

## ✅ QUICK IMPLEMENTATION STEPS

### To Add Review Submission:
1. Create `ReviewSubmission.tsx` component
2. Add to Reviews section
3. Create POST endpoint in backend
4. Display submitted reviews in carousel after admin approval

### To Add Password Change:
1. Create `AdminSettings.tsx` component
2. Add Settings button to admin sidebar
3. Create PUT endpoint in backend
4. Implement password change logic with bcrypt

---

## 📞 ADMIN CREDENTIALS

**Email:** admin@vatti.com  
**Password:** Admin@123456  
**URL:** http://localhost:5173/admin.html

---

## 🗄️ DATABASE COLLECTIONS

### Users Collection:
```javascript
{
  _id: ObjectId,
  email: "admin@vatti.com",
  password: "hashed_bcrypt_password",
  name: "Admin User",
  createdAt: Date
}
```

### Reviews Collection:
```javascript
{
  _id: ObjectId,
  name: "Customer Name",
  email: "customer@example.com",
  rating: 5,
  comment: "Great experience!",
  approved: true/false,
  createdAt: Date
}
```

---

**Note:** Both features require frontend form components and backend API endpoints to be implemented.
