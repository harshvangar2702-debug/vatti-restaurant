import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User';

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/vatti-restaurant');
    console.log('MongoDB connected for seeding...');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@vatti.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123456', salt);

    // Create admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@vatti.com',
      password: hashedPassword,
    });

    await admin.save();
    console.log('✅ Admin user created successfully');
    console.log('Email: admin@vatti.com');
    console.log('Password: Admin@123456');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
