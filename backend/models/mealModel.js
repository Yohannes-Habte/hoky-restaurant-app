import mongoose from 'mongoose';

const { Schema } = mongoose;

const mealSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    description: { type: String, required: true },
    photos: { type: [String], required: true },
    featured: { type: Boolean, default: false },
    ratings: [Object],
  },
  { timestamps: true }
);

const Meal = mongoose.model('Meal', mealSchema);
export default Meal;
