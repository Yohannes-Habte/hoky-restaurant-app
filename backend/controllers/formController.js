import createError from 'http-errors';
import { drinkInuts, mealInuts, reservationInputs, sidebarMenu, userInputs } from '../data/frontendData.js';


// Get user Form inputs
export const getUserFormInputs = (req, res, next) => {
  const useInput = userInputs;
  if (useInput) {
    res.status(200).json(useInput);
  } else {
    res
      .status(200)
      .json({ message: 'User inputs not found. Please try again!' });
  }
};

// Get meal Form inputs
export const getMealFormInputs = async (req, res, next) => {
  const mealInput = mealInuts;
  if (mealInput) {
    res.status(200).json(mealInput);
  } else {
    res
      .status(200)
      .json({ message: 'Meal inputs not found. Please try again!' });
  }
};

// Get drink Form inputs
export const getDrinkFormInputs = async (req, res, next) => {
  const drinkInput = drinkInuts;
  if (drinkInput) {
    res.status(200).json(drinkInput);
  } else {
    res
      .status(200)
      .json({ message: 'Drink inputs not found. Please try again!' });
  }
};

// Get user Form inputs
export const getReservationFormInputs = async (req, res, next) => {
  const reservationInput = reservationInputs;
  if (reservationInput) {
    res.status(200).json(reservationInput);
  } else {
    res
      .status(200)
      .json({ message: 'Reservation inputs not found. Please try again!' });
  }
};

// Get admin sidebar menu data
export const getSidebar = async (req, res, next) => {
  const sideMenu = sidebarMenu;
  if (sideMenu) {
    res.status(200).json(sideMenu);
  } else {
    return next(
      createError(400, 'Sidebar Menu inputs not found. Please try again!')
    );
  }
};
