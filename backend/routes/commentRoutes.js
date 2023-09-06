import express from 'express';

// Comment Router
const commentRouter = express.Router();

// comment routes
commentRouter.post('/new-comment');
commentRouter.get('/:id');
commentRouter.delete('/:id');
commentRouter.get('/');

// Export comment router
export default commentRouter;
