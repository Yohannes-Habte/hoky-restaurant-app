import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import createError from 'http-errors';

//========================================================
// Auth User
//========================================================
export const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return next(createError(401, 'User is not authonticated! Please login!'));
    }

    // Verify the token
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get user ID from the token
    const user = await User.findById(verifiedToken.id).select('-password');

    if (user.id === req.params.id || user.isAdmin) {
      req.user = user;
      return next();
    } else {
      return next(createError(403, 'User not found!'));
    }
  } catch (error) {
    console.log(error);
    next(createError(403, 'User not authorized. Please login!'));
  }
};

//========================================================
// Auth Admin
//========================================================
export const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return next(createError(401, 'User is not authonticated! Please login!'));
    }

    // If token exist, decode it
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find user ID from the database
    const user = await User.findById(decodedToken.id);
    if (user.id && user.isAdmin && user.role === 'admin') {
      req.user = user;
      next();
    } else {
      return next(createError(403, 'User is not authorized as an admin!'));
    }
  } catch (error) {
    console.log(error);
    res.status(403);
    throw new Error('User is not authorized!');
  }
};
