import User from '../models/userModel.js';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware.js/generateToken.js';
import jwt from 'jsonwebtoken';

//===========================================================
// Register a new user in the database
//===========================================================

export const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password, image } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // If user already exist exist in the database
    if (user) {
      res.status(400);
      throw new Error('Eail has already been taken. Please try another one!');
    }

    // If user does not exist in the database
    if (!user) {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        image: image,
      });

      // Save the new user in the database
      const savedUser = await newUser.save();

      // User token
      const token = generateToken(savedUser._id);

      return res
        .cookie('access_token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400),
          sameSite: 'none',
          secure: true,
        })
        .status(201)
        .json({
          _id: savedUser._id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          role: savedUser.role,
          token: token,
        });
    } else {
      res.status(400);
      throw new Error('Invalid user data! Please try again!');
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not sign up. Please try again!'));
  }
};

//===========================================================
// Login a register user in the database
//===========================================================
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // If user does not exist in the database
    if (!user) {
      res.status(200);
      throw new Error('This email does not exist. Please sign up!');
    }

    // If user exist, then check user password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(200);
      throw new Error('Invalid password!');
    }

    // If user exist and password is valid, user will login
    if (user && isPasswordValid) {
      const { password, isAdmin, ...otherDetails } = user._doc;

      // Token of the user
      const token = generateToken(user._id);

      // Now, the cookies and the usere data willl be sent to the frontend
      return res
        .cookie('access_token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400),
          sameSite: 'none',
          secure: true,
        })
        .status(200)
        .json({ ...otherDetails });
    } else {
      res.status(400);
      throw new Error('Invalid email or password! Please check it!');
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not log in. Please try again!'));
  }
};

//=====================================================================
// Log out a user
//=====================================================================

export const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.cookie('access_token', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'none',
      secure: true,
    });

    return res.status(200).json({
      message: `You have successfully logged out.`,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not logout. Please try again!'));
  }
};

//=====================================================================
// Get user login status
//=====================================================================
export const userLoginStatus = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.json(false);
    }

    // Verify the token
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifiedToken) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.log(error);
  }
};

//=====================================================================
// Update User Profile except photo
//=====================================================================
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.password = req.body.password || user.password;

      const updatedUser = await user.save();
      return res.send({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    return next(
      createError(500, 'Database could not queried. Please try again!')
    );
  }
};

//=====================================================================
// Update User photo
//=====================================================================
export const updateUserPhoto = async (req, res, next) => {
  const { image } = req.body;
  try {
    const user = await User.findById(req.params.id);

    user.image = image;
    const updatedPhoto = await user.save();
    res.status(200).json(updatedPhoto);

  } catch (error) {
    console.log(error);
    return next(
      createError(500, 'Database could not queried. Please try again!')
    );
  }
};

//===========================================================
// Owner and admin has mandate to update user details
//===========================================================
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(createError(400, 'User could not be updated. Please try again!'));
  }
};

//===========================================================
// Get one user from the database
//===========================================================
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(createError(400, 'User could not be accessed. Please try again!'));
  }
};

//===========================================================
// Admin has mandate to get all users from the database
//===========================================================
export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(
      createError(400, 'User unable to access all users. Please try again!')
    );
  }
};

//===========================================================
// Admin has mandate to get all users's count in database
//===========================================================
export const countAllUsers = async (req, res, next) => {
  try {
    const user = await User.countDocuments();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(
      createError(
        400,
        'You are unable to access the size of the users. Please try again!'
      )
    );
  }
};

//===========================================================
// Owner and admin has mandate to delete a user from database
//===========================================================
export const deleteOnelUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(`${user.firstName} has been successfully deleted. Welcome back!`);
  } catch (error) {
    console.log(error);
    next(createError(400, 'User could not be deleted. Please try again!'));
  }
};

//===========================================================
// Admin has mandate to delete delete all users from the database
//===========================================================
export const deleteAlllUsers = async (req, res, next) => {
  try {
    await User.deleteMany();
    res.status(200).json('All users has been successfully deleted!');
  } catch (error) {
    console.log(error);
    next(createError(400, 'Users could not be deleted. Please try again!'));
  }
};
