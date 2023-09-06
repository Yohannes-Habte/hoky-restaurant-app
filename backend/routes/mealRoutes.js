import express from 'express';

// Meal Router
const mealRouter = express.Router();

// Meal Routes
mealRouter.post('/createMeal');
mealRouter.put('/updateMeal/:id');
mealRouter.get('/:id');
mealRouter.get('/');
mealRouter.get('/count/meals');
mealRouter.delete('/:id');
mealRouter.delete('/');

// Export Meal Router
export default mealRouter;
