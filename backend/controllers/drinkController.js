import Drink from '../models/drinkModel.js';
import createError from 'http-errors';

// Post new drink
export const createDrink = async (req, res, next) => {
  // Get all the details from the body
  const {
    name,
    price,
    image,
    quantity,
    category,
    brand,
    description,
    featured,
    ratings,
  } = req.body;

  try {
    // If fields are not filled in, then ...
    if (
      !name ||
      !price ||
      !image ||
      !quantity ||
      !category ||
      !brand ||
      !description ||
      !featured
    ) {
      return next(createError(400, 'Please fill in all fields'));
    }

    // Create new Meal
    const newDrink = await Drink.create({
      name: name,
      price: price,
      image: image,
      quantity: quantity,
      category: category,
      brand: brand,
      description: description,
      featured: featured,
      ratings: ratings,
    });
    res.status(201).json(newDrink);
  } catch (error) {
    console.log(error);
    next(createError(500, 'Drink could not be created. Please try again!'));
  }
};

// Get a single drink
export const getSingleDrink = async (req, res, next) => {
  try {
    const drink = await Drink.findById(req.params.id);
    if (!drink) {
      return next(createError(400, 'Drink not found! Please try again!'));
    } else {
      res.status(200).json(drink);
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Drink could not be accessed. Please try again!'));
  }
};

// Delete a single drink
export const deleteSingleDrink = async (req, res, next) => {
  try {
    const drink = await Drink.findById(req.params.id);
    if (!drink) {
      return next(createError(400, 'Drink not found! Please try again!'));
    } else {
      await Drink.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: `${meal.name} has been successfuly deleted!` });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Drink could not be deleted. Please try again!'));
  }
};

// Update a single drink
export const updateDrink = async (req, res, next) => {
  // Get all the variables of the drink that could be updated from the body
  const {
    name,
    category,
    quantity,
    price,
    brand,
    description,
    photos,
    featured,
  } = req.body;

  try {
    const drink = await Drink.findById(req.params.id);
    if (!drink) {
      return next(createError(400, 'Drink not found! Please try again!'));
    }

    // Update the drink
    const updateDrink = await Drink.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        quantity,
        price,
        brand,
        description,
        photos,
        featured,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json(updateDrink);
  } catch (error) {
    console.log(error);
    next(createError(500, 'Drink could not be updated. Please try again!'));
  }
};

// Get all meals
export const getAllDrinks = async (req, res, next) => {
  try {
    const drinks = await Drink.find().sort('-createdAt');

    if (drinks) {
      res.status(200).json(drinks);
    } else {
      return next(createError(400, 'Drinks not found! Please try again!'));
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Drinks could not be accessed. Please try again!'));
  }
};
