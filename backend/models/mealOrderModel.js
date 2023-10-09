import mongoose from 'mongoose';

const { Schema } = mongoose;

const mealOrderSchema = new Schema(
  {
    orderMeals: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        meal: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Meal',
          required: true,
        },
      },
    ],
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    mealsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const MealOrder = mongoose.model('MealOrder', mealOrderSchema);
export default MealOrder;
