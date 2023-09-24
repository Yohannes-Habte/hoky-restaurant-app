import express from 'express';
import {
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
formRouter.get('/reservation-inputs', getReservationFormInputs);
formRouter.get('/sidebar-items', getSidebar);

// Export comment router
export default formRouter;
