import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';

// Routes
import userRouter from './routes/userRoutes.js';
import mealRouter from './routes/mealRoutes.js';
import reservationRouter from './routes/reservationRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import globalErrorHandler from './middleware.js/globalErrorHandler.js';
import formRouter from './routes/formRoutes.js';


// Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://hoky-app.vercel.app'],
    credentials: true, // to send token from the backend to the frontend
  })
);

// Security key holder
dotenv.config();

// Connect to DB
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('DB is connected!'.green.bold);
  } catch (error) {
    console.error;
  }
};

// Display tiny changes
app.use(morgan('tiny'));

// End points
app.use('/api/users', userRouter);
app.use('/api/meals', mealRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/comments', commentRouter);
app.use('/api/forms', formRouter);

// Static assets
app.use(express.static('assets'));

// Global error handler
app.use(globalErrorHandler);

// Server Listner
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToDB();
  console.log(`The server starts on port ${PORT}`.yellow.bold);
});
