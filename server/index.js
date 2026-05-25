import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './src/config/db.js';
import courseRoutes from './src/routes/courseRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logger (development only)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// ==================== ROUTES ====================
app.use('/api/courses', courseRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: '🚀 Dreama Academy API is running',
    timestamp: new Date().toISOString(),
    database: 'MongoDB Atlas',
    version: '1.0.0',
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

// ==================== START (connect DB first, then listen) ====================
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n🚀 Dreama Academy Server running on port ${PORT}`);
    console.log(`📡 API:    http://localhost:${PORT}/api`);
    console.log(`🏥 Health: http://localhost:${PORT}/api/health\n`);
  });
};

startServer();

export default app;
