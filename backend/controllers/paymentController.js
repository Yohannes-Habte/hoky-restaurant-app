import MealOrder from '../models/mealOrderModel.js';
import Stripe from 'stripe';

//===================================================================
// Payment using PayPal
//===================================================================

export const PayPalPayment = async (req, res, next) => {
  try {
    const orderPayment = await MealOrder.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const saveOrderPayment = await orderPayment.save();
      return res.status(200).send(saveOrderPayment);
    } else {
      return next(createError(400, 'Order not found. Please try again!'));
    }
  } catch (error) {
    console.log(error);
    next(createError(404, 'Database could not be queried. Please try again?'));
  }
};

//===================================================================
// Payment using Stripe
//===================================================================
export const stripePayment = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'EUR',
            product_data: {
              name: 'Meal',
            },
            unit_amount: +req.body.total * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/stripe-success`,
      cancel_url: `http://localhost:3000/stripe-cancel`,
    });
    //cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
