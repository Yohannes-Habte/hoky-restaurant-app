import React, { useContext, useReducer } from 'react';
import { UserCartContext } from '../../context/userCart/UserCartProvider';
import { USER_CART_ACTION } from '../../context/userCart/UserCartReducer';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorMessage from '../../compenents/messages/ErrorMessage';
import { Helmet } from 'react-helmet-async';
import './PlaceOrder.scss';

// Object for placing an order
const PLACING_ORDER = {
  ORDER_REQUEST: 'ORDER_REQUEST',
  ORDER_SUCCESS: 'ORDER_SUCCESS',
  ORDER_FAIL: 'ORDER_FAIL',
};
// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case PLACING_ORDER.ORDER_REQUEST:
      return { ...state, loading: true };
    case PLACING_ORDER.ORDER_SUCCESS:
      return { ...state, loading: false };
    case PLACING_ORDER.ORDER_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PlaceOrder = () => {
  const navigate = useNavigate();
  // Global state variables
  const { user, cart, dispatch: contextDispatch } = useContext(UserCartContext);

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  // Rounding to two decimal place
  const roundTwoDecimal = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  // Add total meals' price to the cart object. The key is mealsPrice
  cart.mealsPrice = roundTwoDecimal(
    cart.orderMeals.reduce((accu, curr) => accu + curr.quantity * curr.price, 0)
  );

  // Add tax price to the cart object. The key is taxPrice
  cart.taxPrice = roundTwoDecimal(0.15 * cart.mealsPrice);

  // Add total price to the cart object. The key is totalPrice
  cart.totalPrice = cart.mealsPrice + cart.taxPrice;

  console.log(cart)
  //=======================================================
  // Submit Meal order
  //=======================================================
  const submitOrder = async () => {
    try {
      const newOrder = {
        orderMeals: cart.orderMeals,
        paymentMethod: cart.paymentMethod,
        mealsPrice: cart.mealsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      };

      // Request an order

      dispatch({ type: PLACING_ORDER.ORDER_REQUEST });

      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/api/orders/new-order',
        newOrder,
        { withCredentials: true }
      );

      // Clear the cart after placing an order
      dispatch({ type: USER_CART_ACTION.CLEAR_CART });

      // successful order
      dispatch({ type: PLACING_ORDER.ORDER_SUCCESS });

      localStorage.removeItem('orderMeals');
      navigate(`/orders/${data.mealOrder._id}`); // mealOrder is the order created in the backend
    } catch (err) {
      dispatch({ type: PLACING_ORDER.ORDER_FAIL });
      toast.error(ErrorMessage(err));
    }
  };
  return (
    <main className="place-order-page">
      <Helmet>
        <title>Order Preview</title>
      </Helmet>

      <section className="place-order-container">
        <h1 className="order-title"> General Order Preview </h1>
        <div className="order-wrapper">
          {/* Order Preview  */}
          <div className="order-infos">
            {/* Shopping Items */}
            <article className="ordered-meals">
              <h3 className="subTitle">Shopping Items</h3>
              <NavLink className={'edit-order'} to={'/cart'}>
                Edit
              </NavLink>
              <div className="meals-info">
                {cart.orderMeals.map((meal) => {
                  return (
                    <section key={meal._id} className="meal-wrapper">
                      <figure className="image-container">
                        <NavLink to={`/meals/${meal._id}`}>
                          <img
                            src={meal.image}
                            alt={meal.name}
                            className="image"
                          />
                        </NavLink>
                      </figure>

                      <h3 className="subTitle">
                        <NavLink to={`/meals/${meal._id}`}>{meal.name}</NavLink>
                      </h3>

                      <p className="paragraph"> {meal.quantity} </p>

                      <p className="paragraph"> ${meal.price} </p>
                    </section>
                  );
                })}
              </div>
            </article>

            {/* Payment Method */}
            <article className="payment-method">
              <h4 className="subTitle">Payment</h4>
              <p className="paragraph">Method: {cart.paymentMethod}</p>
              <NavLink className={'edit-payment'} to={'/payment'}>
                Edit
              </NavLink>
            </article>
          </div>

          {/* Order summary  */}
          <article className="order-summary">
            <h4 className="sutTitle">Order Summary</h4>
            <div className="order-summary-details">
              <article className="summary-box">
                <p className="paragraph">Price</p>
                <p className="paragraph">{cart.mealsPrice.toFixed(2)} €</p>
              </article>

              <div className="summary-box">
                <p className="paragraph">Tax</p>
                <p className="paragraph">{cart.taxPrice.toFixed(2)} €</p>
              </div>

              <hr className="horizontal-line" />

              <div className="summary-box total">
                <p className="paragraph">Total</p>
                <p className="paragraph">{cart.totalPrice.toFixed(2)} €</p>
              </div>
            </div>
            <button onClick={submitOrder} className="order-btn">
              Submit Order
            </button>
          </article>
        </div>
      </section>
    </main>
  );
};

export default PlaceOrder;
