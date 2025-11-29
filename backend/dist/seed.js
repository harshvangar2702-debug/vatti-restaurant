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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("./models/User"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        yield mongoose_1.default.connect('mongodb://localhost:27017/vatti-restaurant');
        console.log('MongoDB connected for seeding...');
        // Check if admin user already exists
        const existingAdmin = yield User_1.default.findOne({ email: 'admin@vatti.com' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }
        // Hash the password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash('Admin@123456', salt);
        // Create admin user
        const admin = new User_1.default({
            name: 'Admin',
            email: 'admin@vatti.com',
            password: hashedPassword,
        });
        yield admin.save();
        console.log('✅ Admin user created successfully');
        console.log('Email: admin@vatti.com');
        console.log('Password: Admin@123456');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding admin user:', error);
        process.exit(1);
    }
});
seedAdmin();
