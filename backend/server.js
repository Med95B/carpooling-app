import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import rideRoutes from './routes/rideRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js'
import invitationRoutes from './routes/invitationRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js';
import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement à partir de .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(),'backend/uploads/profileDocs')))
app.use(errorMiddleware);

// MongoDB connection
connectDB();

// Routes
app.use('/api', userRoutes);
app.use('/api', rideRoutes);
app.use('/api', tripRoutes);
app.use('/api',vehicleRoutes)
app.use('/api',invitationRoutes)

//server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

