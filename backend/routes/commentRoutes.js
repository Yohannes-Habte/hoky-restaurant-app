import express from 'express';
import { getAllComments, newComment } from '../controllers/commentController.js';


// Comment Router
const commentRouter = express.Router();

// comment routes
commentRouter.post('/new-comment', newComment);
commentRouter.get('/:id');
commentRouter.delete('/:id');
commentRouter.get('/', getAllComments);

// Export comment router
export default commentRouter;
