import express from 'express';
import {
  createMeal,
  deleteMeal,
  deleteReview,
  getAllMeals,
  getEastAfrocaCategory,
  getMeatCategory,
  getMixedCategory,
  getSingleMeal,
  getVeganCategory,
  reviewMeal,
  updateMeal,
  updateReview,
} from '../controllers/mealController.js';
import { adminAuth, userAuth } from '../middleware.js/authMiddleware.js';

// Meal Router
const mealRouter = express.Router();

// Meal Routes
mealRouter.post('/new-meal', adminAuth, createMeal);
mealRouter.get('/', getAllMeals);
mealRouter.get('/categories/meats', getMeatCategory);
mealRouter.get('/categories/vegan', getVeganCategory);
mealRouter.get('/categories/mixed', getMixedCategory);
mealRouter.get('/categories/east-africa-dishes', getEastAfrocaCategory);
mealRouter.get('/:id', getSingleMeal);
mealRouter.get('/count/meals');
mealRouter.delete('/:id', adminAuth, deleteMeal);
mealRouter.delete('/');
mealRouter.put('/:id', adminAuth, updateMeal);
mealRouter.patch('/review/:id', userAuth, reviewMeal);
mealRouter.patch('/deleteReview/:id', userAuth, deleteReview);
mealRouter.patch('/updateReview/:id', userAuth, updateReview); // Identify a Meal by Id and rate it

// Export Meal Router
export default mealRouter;
