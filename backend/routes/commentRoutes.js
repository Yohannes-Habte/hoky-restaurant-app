import express from 'express';
import {
  deleteComment,
  getAllComments,
  getComment,
  newComment,
} from '../controllers/commentController.js';

// Comment Router
const commentRouter = express.Router();

// comment routes
commentRouter.post('/new-comment', newComment);
commentRouter.get('/:id', getComment);
commentRouter.delete('/:id', deleteComment);
commentRouter.get('/', getAllComments);

// Export comment router
export default commentRouter;
