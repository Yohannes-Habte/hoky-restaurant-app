import {
  mealInuts,
  reservationInputs,
  sidebarMenu,
  userInputs,
} from '../dataFrontend.js';

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

// Get user Form inputs
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
    res
      .status(200)
      .json({ message: 'Sidebar Menu inputs not found. Please try again!' });
  }
};
