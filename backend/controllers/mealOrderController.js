import MealOrder from '../models/mealOrderModel.js';
import createError from 'http-errors';

//===========================================================
// The user has the mandate place an order
//===========================================================

export const placeOrder = async (req, res, next) => {
  try {
    const newOrder = new MealOrder({
      orderMeals: req.body.orderMeals.map((dish) => ({
        ...dish,
        meal: dish._id,
      })),

      paymentMethod: req.body.paymentMethod,
      mealsPrice: req.body.mealsPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const mealOrder = await newOrder.save();
    res.status(201).send({ message: 'New Product Order is:', mealOrder });
  } catch (error) {
    console.log(error);
    next(createError(404, 'The meal Order is not placed. Please try again?'));
  }
};

//===========================================================
// The user and admin have the mandate to get an order
//===========================================================
export const getOneOrder = async (req, res, next) => {
  try {
    const order = await MealOrder.findById(req.params.id);
    if (order) {
      res.status(200).send(order);
    } else {
      return next(createError(400, 'There is no meal. Please try again!'));
    }
  } catch (error) {
    console.log(error);
    next(
      createError(404, 'You cannot access the ordered meal. Please try again?')
    );
  }
};
