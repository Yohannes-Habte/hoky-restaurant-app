import express from 'express';
import {
  createReservation,
  deleteReservation,
  getAllReservations,
  getReservation,
} from '../controllers/reservationController.js';

// Comment Router
const reservationRouter = express.Router();

// comment routes
reservationRouter.post('/new', createReservation);
reservationRouter.get('/:id', getReservation);
reservationRouter.delete('/:id', deleteReservation);
reservationRouter.get('/', getAllReservations);

// Export comment router
export default reservationRouter;
