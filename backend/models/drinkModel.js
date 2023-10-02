import mongoose from 'mongoose';

const { Schema } = mongoose;

const drinkSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    featured: { type: Boolean, default: false },
    ratings: [Object],
  },
  { timestamps: true }
);

const Drink = mongoose.model('Drink', drinkSchema);
export default Drink;
