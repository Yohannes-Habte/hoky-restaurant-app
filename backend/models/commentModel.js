import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    image: {
      type: String,
      default:
        'https://icon-library.com/images/no-image-icon//no-image-icon-0.jpg',
    },
  },
  { timestamps: true }
);

// Comment Model
const Comment = mongoose.model('Comment', commentSchema);

// Export Comment
export default Comment;
