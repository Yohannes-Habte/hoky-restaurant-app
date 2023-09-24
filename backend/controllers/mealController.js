import Meal from '../models/mealModel.js';
import createError from 'http-errors';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

// Post new meals
export const createMeal = async (req, res, next) => {
  // Get all the details from the body
  const {
    name,
    category,
    price,
    discountedPrice,
    description,
    image,
    quantity,
    featured,
    ratings,
  } = req.body;

  try {
    // If fields are not filled in, then ...
    if (
      !name ||
      !category ||
      !quantity ||
      !price ||
      !discountedPrice ||
      !description ||
      !image ||
      !featured
    ) {
      res.status(404);
      throw new Error('Please fill in all fields');
    }

    // Create new Meal
    const meal = await Meal.create({
      name: name,
      category: category,
      quantity: quantity,
      price: price,
      discountedPrice: discountedPrice,
      description: description,
      image: image,
      featured: featured,
      ratings: ratings,
    });
    res.status(201).json(meal);
  } catch (error) {
    console.log(error);
    next(createError(500, 'Meal could not be created. Please try again!'));
  }
};

// Get all meals
export const getAllMeals = async (req, res, next) => {
  try {
    const meals = await Meal.find().sort('-createdAt');

    res.status(200).json(meals);
  } catch (error) {
    console.log(error);
    next(createError(500, 'Meals could not be accessed. Please try again!'));
  }
};

// Get a single meal
export const getSingleMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      res.status(404);
      throw new Error('Meal not found! Please try again!');
    }
    res.status(200).json(meal);
  } catch (error) {
    console.log(error);
    next(createError(500, 'Meal could not be accessed. Please try again!'));
  }
};

// Delete a single meal
export const deleteMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      res.status(404);
      throw new Error('Meal not found! Please try again!');
    }

    await Meal.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: `${meal.name} meal has been successfuly deleted!` });
  } catch (error) {
    console.log(error);
    next(createError(500, 'Meal could not be deleted. Please try again!'));
  }
};

// Update a single meal
export const updateMeal = async (req, res, next) => {
  // Get all the variables of the meal that could be updated from the body
  const {
    name,
    category,
    quantity,
    price,
    discountedPrice,
    description,
    photos,
    featured,
  } = req.body;

  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      res.status(404);
      throw new Error('Meal not found! Please try again!');
    }

    // Update the meal

    const updateMeal = await Meal.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        quantity,
        price,
        discountedPrice,
        description,
        photos,
        featured,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(updateMeal);
  } catch (error) {
    console.log(error);
    next(createError(500, 'Meal could not be updated. Please try again!'));
  }
};

// ==================================================================================
// Rating a specific Meal by the customer
// ==================================================================================
export const reviewMeal = async (req, res, next) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  try {
    // Validation
    if (star < 1 || !review) {
      res.status(404);
      throw new Error('Please add star and review!');
    }

    const meal = await Meal.findById(id);

    // If meal is not found, ...
    if (!meal) {
      res.status(404);
      throw new Error('Meal not found. Please try again!');
    }

    // Update rating for the found meal
    meal.ratings.push({
      star,
      review,
      nane: `${req.user.firstName} ${req.user.lastName}`, // who reviewed the meal
      userId: req.user._id, // Reviewer ID
    });

    // Save the rated meal in the database under ratings
    meal.save();

    // Send
    res.status(200).json({ message: 'Meal review added!' });
  } catch (error) {
    console.log(error);
    next(createError(500, 'Meal could not be reviewed. Please try again!'));
  }
};

// ==================================================================================
// Delete the meal rating by a specific user
// ==================================================================================

export const deleteReview = async (req, res, next) => {
  // Get user ID from the frontend
  const { userId } = req.body;
  try {
    const meal = await Meal.findById(req.params.id);

    // If meal is not found, ...
    if (!meal) {
      res.status(404);
      throw new Error('Meal not found. Please try again!');
    }

    // Get all the ratings except with this userId ratings
    const userRatings = meal.ratings.filter((rating) => {
      return rating.userId.toString() !== userId.toString();
    });

    meal.ratings = userRatings;

    // Save the review of the meal after deleting rated by a specific user
    meal.save();

    // Send
    res.status(200).json({
      message: ` ${meal.name} meal review has been successfully deleted!`,
    });
  } catch (error) {
    console.log(error);
    next(
      createError(
        500,
        'The reviewed meal could not be deleted. Please try again!'
      )
    );
  }
};

// ==================================================================================
// Update the review for a meal
// ==================================================================================

export const updateReview = async (req, res, next) => {
  const { star, review, userId } = req.body;
  const { id } = req.params;

  // Validation
  if (star < 1 || !review) {
    res.status(404);
    throw new Error('Please add star and review!');
  }

  try {
    const meal = await Meal.findById(id);

    // If meal is not found, ...
    if (!meal) {
      res.status(400);
      throw new Error('Meal not found. Please try again!');
    }

    // Match user in the database to reviewer in the frontend
    if (req.user._id.toString() !== userId) {
      res.status(401);
      throw new Error('User not authorized. Please try again!');
    }

    // If the user and reviewer matches, update the meal rating
    const updatedReview = await Meal.findOneAndUpdate(
      {
        _id: meal._id,
        'ratings.userId': req.user._id,
      },
      {
        $set: {
          'ratings.$.star': star,
          'ratings.$.review': review,
        },
      },
      { new: true, runValidators: true }
    );

    // Send
    if (updatedReview) {
      res.status(200).json({
        message: ` The meal review has been successfully updated!`,
      });
    } else {
      res.status(400).json({
        message: ` The meal review has not been updated. Please try again!`,
      });
    }
  } catch (error) {
    console.log(error);
    next(
      createError(
        500,
        'The reviewed meal could not be deleted. Please try again!'
      )
    );
  }
};
