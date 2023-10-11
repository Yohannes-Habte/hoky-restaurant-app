import express from 'express';
import { getOneOrder, placeOrder } from '../controllers/mealOrderController.js';
import { userAuth } from '../middleware.js/authMiddleware.js';

// Order Router

const orderRouter = express.Router();

// Order Routes

orderRouter.post('/new-order', userAuth, placeOrder);
orderRouter.get('/:id', userAuth, getOneOrder);

// Export Order Router

export default orderRouter;
