import Comment from '../models/commentModel.js';

// Create new commnet
export const newComment = async (req, res, next) => {
  const comment = new Comment(req.body);

  try {
    const saveComment = await comment.save();
    res.status(201).json(saveComment);
  } catch (error) {
    console.log(error);
  }
};

// Get all commnets
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().sort("-createdAt");
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
};
