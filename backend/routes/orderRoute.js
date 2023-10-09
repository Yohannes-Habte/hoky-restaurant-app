import express from 'express';
import { placeOrder } from '../controllers/mealOrderController.js';
import { userAuth } from '../middleware.js/authMiddleware.js';

// Order Router

const orderRouter = express.Router();

// Order Routes

orderRouter.post('/new-order', userAuth, placeOrder);

// Export Order Router

export default orderRouter;
