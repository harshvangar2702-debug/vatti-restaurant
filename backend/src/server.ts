import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import menuRoutes from './routes/menu';
import reservationRoutes from './routes/reservation';
import reviewRoutes from './routes/review';
import promotionRoutes from './routes/promotion';
import galleryRoutes from './routes/gallery';
import authRoutes from './routes/auth';

const app = express();
const port = process.env.PORT || 5001;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL // Production URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined. Database connection will fail.');
  if (process.env.NODE_ENV === 'production') {
    console.error('Please set MONGODB_URI in your Vercel project settings.');
  }
}

mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/vatti-restaurant')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Note: Uploads will not persist on Vercel
app.use('/uploads', express.static('uploads'));

app.use('/api/menu', menuRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Vatti Restaurant API');
});

// Only start the server if not running in Vercel (Vercel handles this)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

export default app;
