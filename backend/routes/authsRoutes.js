import express from 'express';
import { localVariables } from '../middleware.js/authMiddleware.js';
import {
  forgotPassword,
  generateOTP,
  loginUser,
  logoutUser,
  registerUser,
  resetingPassword,
  userLoginStatus,
} from '../controllers/authConstroller.js';

// Auth Router
const authRouter = express.Router();

// Auth Routes
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/loginStatus', userLoginStatus);
authRouter.get('/logout', logoutUser);

// Forgot and Reset password First Method
authRouter.get('/generateOTP', localVariables, generateOTP);

//  Forgot and Reset password Second Method
authRouter.post('/forgotPassword', forgotPassword);
authRouter.patch('/resetPassword/:token', resetingPassword);

export default authRouter;
