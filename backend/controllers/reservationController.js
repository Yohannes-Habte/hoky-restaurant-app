import Reservation from '../models/reservationModel.js';
import User from '../models/userModel.js';

// Create new Reservation
export const createReservation = async (req, res, next) => {
  const newReservation = new Reservation(req.body);
  try {
    const saveReservation = await newReservation.save();
    res.status(201).json(saveReservation);
  } catch (error) {
    console.log(error);
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
  }
};

// Get All Reservations
export const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    if (reservations) {
      res.status(200).json(reservations);
    } else {
      res.status(400);
      throw new Error('Reservations not found! Please try again!');
    }
  } catch (error) {
    console.log(error);
  }
};

// Delet Single Reservation
export const deleteReservation = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (user && reservation) {
      await Reservation.findByIdAndDelete(req.params.id);
      res.status(201).json({
        message: `${user.firstName} ${user.lastName} reservation  has been successfully deleted!`,
      });
    } else {
      res.status(400);
      throw new Error('User or reservation is not found! Please try again!');
    }
  } catch (error) {
    console.log(error);
  }
};
