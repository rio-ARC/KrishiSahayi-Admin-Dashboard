import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { name, email, password, role, phone, district } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered', data: null });
        }

        const user = await User.create({ name, email, password, role, phone, district });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: { user, token }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials', data: null });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials', data: null });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            message: 'Login successful',
            data: { user, token }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null });
    }
};
