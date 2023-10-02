import express from 'express';
import {
  createDrink,
  deleteSingleDrink,
  getAllDrinks,
  getSingleDrink,
  updateDrink,
} from '../controllers/drinkController.js';
import { adminAuth } from '../middleware.js/authMiddleware.js';

// Drink Router
const drinkRouter = express.Router();

// Drink Routes
drinkRouter.post('/new-drink', adminAuth, createDrink);
drinkRouter.get('/:id', getSingleDrink);
drinkRouter.put('/:id', adminAuth, updateDrink);
drinkRouter.delete('/:id', deleteSingleDrink);
drinkRouter.get('/', getAllDrinks);
drinkRouter.get('/categories/coffees');
drinkRouter.get('/categories/hot-drinks');
drinkRouter.get('/categories/wines');
drinkRouter.get('/categories/beers');

// Export drink router
export default drinkRouter;
