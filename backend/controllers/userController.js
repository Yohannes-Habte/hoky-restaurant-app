import User from '../models/userModel.js';
import createError from 'http-errors';


//=====================================================================
// Get user login name
//=====================================================================
export const getName = async (req, res, next) => {
  try {
    const users = await User.find();
    const role = users.filter((user) => user.role === 'admin');
    if (role) {
      return res
        .status(200)
        .json(
          `${role.map((user) => user.firstName)} ${role.map(
            (user) => user.lastName
          )}`
        );
    } else {
      return next(createError(400, 'User is not an Admin!'));
    }
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'Server could not be queried! Please try again!')
    );
  }
};

//=====================================================================
// Get user login photo
//=====================================================================
export const getPhoto = async (req, res, next) => {
  try {
    const users = await User.find();
    const photo = users.filter((user) => user.role === 'admin');
    if (photo) {
      return res.status(200).json(photo.map((user) => user.image));
    } else {
      return next(createError(400, 'User photo not found!'));
    }
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'Server could not be queried! Please try again!')
    );
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
