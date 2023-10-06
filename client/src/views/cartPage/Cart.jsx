import React, { useContext } from 'react';
import './Cart.scss';
import { Helmet } from 'react-helmet-async';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserCartContext } from '../../context/userCart/UserCartProvider';
import axios from 'axios';
import { USER_CART_ACTION } from '../../context/userCart/UserCartReducer';
import { toast } from 'react-toastify';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaTrash,
} from 'react-icons/fa';

const Cart = () => {
  // Navigate to shipping page
  const navigate = useNavigate();

  // Global state variables
  const { dispatch, cartMeals, user } = useContext(UserCartContext);

  // Increating and/or decreating meal quantity in the cart
  const updateCart = async (meal, quantity) => {
    // Find the meal from the backend
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL + `/api/meals/${meal._id}`
    );
    if (data.quantity < quantity) {
      window.alert(
        'Sorry, There is no additional meal in the stock. Please contact us to meet your needs!'
      );
      return;
    } else {
      dispatch({
        type: USER_CART_ACTION.ADD_MEAL_TO_CART,
        payload: { ...meal, quantity },
      });
    }
  };

  // Function to remove product from the cart
  const removeProduct = (meal) => {
    dispatch({
      type: USER_CART_ACTION.REMOVE_MEAL_FROM_CART,
      payload: meal,
    });
  };

  // Function that check user login status
  const checkoutHandler = async () => {
    if (!user) {
      toast.error('Please login to proceed to next step!');
      navigate('/login');
    } else {
      navigate('/shipping');
    }
  };

  return (
    <main className="cart-page">
      <Helmet>
        <title>Cart </title>
      </Helmet>

      <section className="cart-container">
        <h1 className="cart-title">
          We will be happy to serve you your favourite meal
        </h1>
        <p className="paragraph">
          It is possible to order meals in the restaurant using the shopping
          cart. If you wish to make a reservation, you have to indicate your
          preferred dishes, the date you will be coming and your preferred time.
        </p>

        {/* Empty cart */}
        {cartMeals.length === 0 && (
          <article className="empty-cart">
            <h3 className="subTitle">
              Cart is empty! Order Your Favourite Healthy Organic Foods
            </h3>

            <NavLink to={'/'} className={'navigate-home-page'}>
              <FaRegArrowAltCircleLeft /> Back to the Meals page to order your
              favourite organic meals!
              <FaRegArrowAltCircleRight />
            </NavLink>
          </article>
        )}

        {/* When cart is not empty */}
        {cartMeals.length > 0 && (
          <article className="orders-wrapper">
            <h3 className="subTitle"> Your Favourite Ordered Dishes </h3>
            <div className="ordered-dishes-and-total-price-container">
              <div className="ordered-meals-container">
                {cartMeals.map((dish) => {
                  return (
                    <div key={dish._id} className="each-ordered-meal-info">
                      {/* Meal image and name */}
                      <div className="image-name-container">
                        <figure className="image-container">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="image"
                          />
                        </figure>
                        <div className="meal-name">
                          <NavLink to={`/meals/${dish._id}`} className={'link'}>
                            {dish.name}
                          </NavLink>
                        </div>
                      </div>

                      {/* Meal quantity management*/}
                      <div className="buttons-quantity-container">
                        {/* Decreating meal quantity */}
                        <button
                          onClick={() => updateCart(dish, dish.quantity - 1)}
                          disabled={dish.quantity === 0}
                          className="quantity-btn"
                        >
                          -
                        </button>

                        {/* Meal quantity */}
                        <span className="quantity">
                          <strong> {dish.quantity}</strong>
                        </span>

                        {/* Increasing meal quantity */}
                        <button
                          onClick={() => updateCart(dish, dish.quantity + 1)}
                          disabled={dish.quantity === dish.countInStock}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>

                      {/* Meal Price */}
                      <div className="meal-price-container">
                        <span className="price">${dish.price}</span>{' '}
                      </div>

                      {/* Delete a product from the cart */}
                      <div className="trash-icon-container">
                        <button
                          onClick={() => removeProduct(dish)}
                          className="trash-btn"
                        >
                          <FaTrash className="icon" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total ordered meals and price as well as to proceed to checkout*/}
              <aside className="total-meals-and-price">
                <h3 className="total-order">
                  Total Ordered Dishes:{' '}
                  {cartMeals.reduce((acc, curr) => acc + curr.quantity, 0)}{' '}
                  Dishes
                </h3>
                <p className="price">
                  <strong>
                    Price: $
                    {cartMeals.reduce(
                      (acc, curr) => acc + curr.price * curr.quantity,
                      0
                    )}
                  </strong>
                </p>
                <button
                  onClick={checkoutHandler}
                  type="button"
                  disabled={cartMeals.length < 2}
                  className="checkout-btn"
                >
                  Proceed to Checkout
                </button>
              </aside>
            </div>
          </article>
        )}
      </section>
    </main>
  );
};
export default Cart;
