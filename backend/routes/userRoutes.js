import express from 'express';
import {
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateUserPhoto,
  updateUserProfile,
  userLoginStatus,
} from '../controllers/userController.js';
import { adminAuth, userAuth } from '../middleware.js/authMiddleware.js';

// User Router
const userRouter = express.Router();

// User routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/user/loginStatus', userLoginStatus);
userRouter.get('/user/logout', logoutUser);
userRouter.patch('/:id', userAuth, updateUserProfile);
userRouter.patch('/:id/update-photo', userAuth, updateUserPhoto);
userRouter.get('/:id', userAuth, getUser);
userRouter.get('/', adminAuth, getUsers);
userRouter.get('/count/customers');
userRouter.delete('/:id');
userRouter.delete('/');

// Export User Router
export default userRouter;
