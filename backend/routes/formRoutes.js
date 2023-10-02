import express from 'express';
import {
  getDrinkFormInputs,
  getMealFormInputs,
  getReservationFormInputs,
  getSidebar,
  getUserFormInputs,
} from '../controllers/formController.js';

// Comment Router
const formRouter = express.Router();

// comment routes
formRouter.get('/user-inputs', getUserFormInputs);
formRouter.get('/meal-inputs', getMealFormInputs);
formRouter.get('/drink-inputs', getDrinkFormInputs);
formRouter.get('/reservation-inputs', getReservationFormInputs);
formRouter.get('/sidebar-items', getSidebar);

// Export comment router
export default formRouter;
