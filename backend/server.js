import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import auth from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(auth);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/farmer', farmerRoutes);

app.get('/api/v1/health', (req, res) => {
    res.json({ success: true, message: 'KrishiSahayi API is running', data: null });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
});
