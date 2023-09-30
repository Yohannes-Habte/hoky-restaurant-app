import mongoose from 'mongoose';

const { Schema } = mongoose;

const mealSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    featured: { type: Boolean, default: false },
    ratings: [Object],
  },
  { timestamps: true }
);

const Meal = mongoose.model('Meal', mealSchema);
export default Meal;
