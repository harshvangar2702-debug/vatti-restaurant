# Admin Panel Documentation

## Overview
The Vatti Restaurant Admin Panel is a comprehensive management system that allows administrators to control and manage all aspects of the restaurant website.

## Features

### 1. **Dashboard**
- Overview of key statistics
- Total number of reservations
- Total menu items
- Total promotions
- Gallery items count
- Total reviews

### 2. **Reservations Management**
- View all table reservations
- Filter reservations by date
- View detailed reservation information:
  - Customer name, email, and phone
  - Reservation date and time
  - Party size
  - Special requests
- Delete reservations

### 3. **Menu Management**
- Add new menu items
- Edit existing menu items
- Delete menu items
- Manage menu item details:
  - Name and description
  - Price
  - Category assignment
  - Dietary options (Vegan, Vegetarian, Gluten-Free, Dairy-Free)
  - Image URL

### 4. **Promotions Management**
- Create new promotions/offers
- Edit existing promotions
- Delete promotions
- Manage promotion details:
  - Title and description
  - Discount percentage
  - Promotional code
  - Expiry date
  - Banner image

### 5. **Gallery Management**
- Upload new gallery items
- Edit gallery items
- Delete gallery items
- Manage gallery details:
  - Title and description
  - Image URL

### 6. **Reviews Management**
- View all customer reviews
- Filter reviews by status (All, Approved, Pending)
- Approve pending reviews
- Delete/reject reviews
- View review details:
  - Customer name and email
  - Rating (star display)
  - Review comment
  - Submission date and time

## Access

### Login
1. Navigate to `/admin` from the website
2. Enter admin credentials:
   - **Email**: Your registered admin email
   - **Password**: Your admin password
3. Click "Login"

### Creating Admin Account
Admin accounts are created on the backend. Contact the system administrator to create your account.

## Usage Guide

### Adding a Menu Item
1. Go to Menu → Click "Add Menu Item"
2. Fill in the form:
   - **Name**: Item name
   - **Description**: Item description
   - **Price**: Item price in rupees
   - **Category**: Select from available categories
   - **Image URL**: URL to the item image
   - **Dietary Options**: Check applicable dietary options
3. Click "Add Item"

### Managing Reservations
1. Go to Reservations
2. View all reservations in a table format
3. Use the date filter to find specific reservations
4. Click "Delete" to remove a reservation if needed

### Creating a Promotion
1. Go to Promotions → Click "Add Promotion"
2. Fill in the form:
   - **Title**: Promotion title
   - **Description**: Promotion details
   - **Discount**: Discount percentage
   - **Promo Code**: Code for customers to use
   - **Expiry Date**: When the promotion ends
   - **Image URL**: Banner image URL
3. Click "Add Promotion"

### Managing Gallery
1. Go to Gallery → Click "Add Gallery Item"
2. Fill in:
   - **Title**: Image title
   - **Description**: Image description
   - **Image URL**: URL to the image
3. Click "Add Item"

### Moderating Reviews
1. Go to Reviews
2. Use filters to view All, Approved, or Pending reviews
3. For pending reviews:
   - Click "Approve" to publish the review
   - Click "Reject" to delete the review
4. For approved reviews, click "Delete" to remove if needed

## Features & Best Practices

### Session Management
- Your login session is stored in localStorage
- Automatically redirects to login if session expires
- Click "Logout" to safely exit

### Data Management
- All changes are immediately saved to the database
- Confirmation dialogs appear before deleting items
- Validation ensures all required fields are filled

### Image URLs
- Use publicly accessible image URLs
- Recommended image hosting: Imgur, Cloudinary, AWS S3
- Ensure URLs use HTTPS protocol

### Error Handling
- Error messages appear if operations fail
- Check backend connection if issues persist
- Contact system administrator for assistance

## Navigation

The admin panel sidebar provides quick access to all sections:
- **Dashboard**: Overview and statistics
- **Reservations**: Table booking management
- **Menu**: Food items and categories
- **Promotions**: Discounts and offers
- **Gallery**: Restaurant photos and media
- **Reviews**: Customer feedback moderation

## Troubleshooting

### Cannot Login
- Verify credentials are correct
- Ensure backend server is running on `http://localhost:5001`
- Contact administrator to verify account

### Cannot See Data
- Check internet connection
- Verify backend API is running
- Try refreshing the page
- Clear browser cache if needed

### Image Not Displaying
- Verify URL is correct and accessible
- Ensure image URL uses HTTPS
- Try a different image URL

### Changes Not Saving
- Check internet connection
- Verify backend server is running
- Look for error messages in the form
- Contact system administrator

## API Integration

The admin panel connects to the following API endpoints:

- `POST /api/auth/login` - Admin login
- `GET /api/menu` - Fetch menu items
- `POST /api/menu` - Create menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item
- `GET /api/reservation` - Fetch reservations
- `DELETE /api/reservation/:id` - Delete reservation
- `GET /api/promotions` - Fetch promotions
- `POST /api/promotions` - Create promotion
- `PUT /api/promotions/:id` - Update promotion
- `DELETE /api/promotions/:id` - Delete promotion
- `GET /api/gallery` - Fetch gallery items
- `POST /api/gallery` - Create gallery item
- `PUT /api/gallery/:id` - Update gallery item
- `DELETE /api/gallery/:id` - Delete gallery item
- `GET /api/review` - Fetch reviews
- `PUT /api/review/:id` - Approve/update review
- `DELETE /api/review/:id` - Delete review

## Security Notes

- Never share your admin password
- Always logout when finished
- Session data is stored securely in localStorage
- Ensure you're on a secure network
- Change password regularly (contact admin)

## Support

For additional support or issues:
1. Contact your system administrator
2. Check the browser console for error messages
3. Verify all backend services are running
