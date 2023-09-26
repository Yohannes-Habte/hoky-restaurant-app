import Comment from '../models/commentModel.js';
import createError from 'http-errors';

// Create new commnet
export const newComment = async (req, res, next) => {
  const comment = new Comment(req.body);

  try {
    if (comment) {
      const saveComment = await comment.save();
      res.status(201).json(saveComment);
    } else {
      res
        .status(400)
        .json({ message: 'Comment not created! Please try again!' });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Server could not query! Please try again!'));
  }
};

// Get Single commnet
export const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(400).json({ message: 'Comment not found! Please try again!' });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Server could not query! Please try again!'));
  }
};

// Delete Single commnet
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (comment) {
      res.status(200).json({ message: 'Comment successfully deleted!' });
    } else {
      res
        .status(400)
        .json({ message: 'Comment not deleted! Please try again!' });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Server could not query! Please try again!'));
  }
};

// Get all commnets
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().sort('createdAt');
    if (comments) {
      res.status(200).json(comments);
    } else {
      res
        .status(400)
        .json({ message: 'Comments not found! Please try again!' });
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'Server could not query! Please try again!'));
  }
};
