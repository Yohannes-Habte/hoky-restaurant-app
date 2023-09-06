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
    console.log('User is =', verifiedToken);

    // Get user ID from the token
    const user = await User.findById(verifiedToken.id).select('-password');

    // Validate user
    /**
    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }
    req.user = user; // This is used to use to replace req.params.id by req.user._id in the userController function
     */

    if (user.id === req.params.id || user.isAdmin) {
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
    if (user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'User is not authorized!'));
    }
  } catch (error) {
    console.log(error);
    next(createError(403, 'User is not authorized!'));
  }
};
