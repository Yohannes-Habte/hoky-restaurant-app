import express from 'express';
import {
  PayPalPayment,
  stripePayment,
} from '../controllers/paymentController.js';

// Payment Router
const paymentRouter = express.Router();

// Payment Routes

paymentRouter.put('/:id/pay', PayPalPayment);
paymentRouter.post('/', stripePayment);

// Export payment router
export default paymentRouter;
