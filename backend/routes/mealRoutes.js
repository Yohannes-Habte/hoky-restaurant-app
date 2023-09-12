import express from 'express';
import {
  createMeal,
  deleteMeal,
  deleteReview,
  getAllMeals,
  getSingleMeal,
  reviewMeal,
  updateMeal,
  updateReview,
} from '../controllers/mealController.js';
import { adminAuth, userAuth } from '../middleware.js/authMiddleware.js';

// Meal Router
const mealRouter = express.Router();

// Meal Routes
mealRouter.post('/createMeal', adminAuth, createMeal);
mealRouter.get('/', getAllMeals);
mealRouter.get('/:id', adminAuth, getSingleMeal);
mealRouter.get('/count/meals');
mealRouter.delete('/:id', adminAuth, deleteMeal);
mealRouter.delete('/');
mealRouter.put('/:id', adminAuth, updateMeal);
mealRouter.patch('/review/:id', userAuth, reviewMeal);
mealRouter.patch('/deleteReview/:id', userAuth, deleteReview);
mealRouter.patch('/updateReview/:id', userAuth, updateReview);  // Identify a Meal by Id and rate it

// Export Meal Router
export default mealRouter;
