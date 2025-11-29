"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const menu_1 = __importDefault(require("./routes/menu"));
const reservation_1 = __importDefault(require("./routes/reservation"));
const review_1 = __importDefault(require("./routes/review"));
const promotion_1 = __importDefault(require("./routes/promotion"));
const gallery_1 = __importDefault(require("./routes/gallery"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
// CORS Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL // Production URL
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express_1.default.json());
// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vatti-restaurant';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
// Note: Uploads will not persist on Vercel
app.use('/uploads', express_1.default.static('uploads'));
app.use('/api/menu', menu_1.default);
app.use('/api/reservation', reservation_1.default);
app.use('/api/review', review_1.default);
app.use('/api/promotions', promotion_1.default);
app.use('/api/gallery', gallery_1.default);
app.use('/api/auth', auth_1.default);
app.get('/', (req, res) => {
    res.send('Vatti Restaurant API');
});
// Only start the server if not running in Vercel (Vercel handles this)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}
exports.default = app;
