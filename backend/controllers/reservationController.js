import Reservation from '../models/reservationModel.js';
import User from '../models/userModel.js';
import createError from 'http-errors';

// Create new Reservation
export const createReservation = async (req, res, next) => {
  const newReservation = new Reservation(req.body);

  try {
    if (newReservation) {
      const saveReservation = await newReservation.save();
      res.status(201).json(saveReservation);
    } else {
      res.status(400).json({
        message:
          'Reservation data from the body is not exist. Please try again!',
      });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Server could not be queried. Please try again!'));
  }
};

// Get All Reservations
export const getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.user._id);

    if (reservation) {
      res.status(200).json(reservation);
    } else {
      res.status(400);
      throw new Error('Reservation not found! Please try again!');
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Server could not be queried. Please try again!'));
  }
};

// Get All Reservations
export const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find().sort('createdAt');
    if (reservations) {
      res.status(200).json(reservations);
    } else {
      res.status(400);
      throw new Error('Reservations not found! Please try again!');
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Server could not be queried. Please try again!'));
  }
};

// Delet Single Reservation
export const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (reservation) {
      await Reservation.findByIdAndDelete(req.params.id);
      res.status(201).json({
        message: `Reservation  has been successfully deleted!`,
      });
    } else {
      res.status(400);
      throw new Error('User or reservation is not found! Please try again!');
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Server could not be queried. Please try again!'));
  }
};
