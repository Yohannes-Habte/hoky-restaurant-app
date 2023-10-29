import express from 'express';
import {
  getName,
  getPhoto,
  getUser,
  getUsers,
  updateUserPhoto,
  updateUserProfile,
} from '../controllers/userController.js';
import { adminAuth, userAuth } from '../middleware.js/authMiddleware.js';

// User Router
const userRouter = express.Router();

// User routes
userRouter.get('/user/name', getName);
userRouter.get('/user/photo', getPhoto);
userRouter.patch('/:id', userAuth, updateUserProfile);
userRouter.patch('/:id/update-photo', userAuth, updateUserPhoto);
userRouter.get('/:id', userAuth, getUser);
userRouter.get('/', adminAuth, getUsers);
userRouter.get('/count/customers');
userRouter.delete('/:id');
userRouter.delete('/');

// Export User Router
export default userRouter;
