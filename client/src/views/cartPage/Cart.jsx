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
  const { dispatch, orderMeals, user } = useContext(UserCartContext);

  // Increating and/or decreating for specific meal quantity in the cart
  const updateCart = async (meal, mealQuantity) => {
    // Find the meal from the backend
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL + `/api/meals/${meal._id}`
    );
    if (data.quantity < mealQuantity) {
      alert(
        'Sorry, There is no additional meal in the stock. Please contact us to meet your needs!'
      );
    } else {
      dispatch({
        type: USER_CART_ACTION.ADD_MEAL_TO_CART,
        payload: { ...meal, mealQuantity },
      });
    }
  };

  // Function to remove product from the cart
  const removeMeal = (meal) => {
    dispatch({
      type: USER_CART_ACTION.REMOVE_MEAL_FROM_CART,
      payload: meal,
    });
  };

  // Function that check user login status
  const checkUserLogin = async () => {
    if (!user) {
      toast.error('Please login to proceed to next step!');
      navigate('/login');
    } else {
      navigate('/payment');
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
        {orderMeals.length === 0 && (
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
        {orderMeals.length > 0 && (
          <article className="orders-wrapper">
            <h3 className="subTitle"> Your Favourite Ordered Dishes </h3>
            <div className="ordered-dishes-and-total-price-container">
              <div className="ordered-meals-container">
                {orderMeals.map((dish) => {
                  return (
                    <div key={dish._id} className="each-ordered-meal-info">
                      {/* Meal image and name */}
                      <div className="image-name-container">
                        <figure className="image-container">
                          <NavLink to={`/meals/${dish._id}`} className={'link'}>
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="image"
                            />
                          </NavLink>
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
                          disabled={dish.mealQuantity === dish.quantity}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>

                      {/* Meal Price */}
                      <div className="meal-price-container">
                        <span className="price">${dish.price}</span>{' '}
                      </div>

                      {/* Delete a meal from the cart */}
                      <div className="trash-icon-container">
                        <button
                          onClick={() => removeMeal(dish)}
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
                  {orderMeals.reduce((acc, curr) => acc + curr.quantity, 0)}{' '}
                  Dishes
                </h3>
                <p className="price">
                  <strong>
                    Price: $
                    {orderMeals.reduce(
                      (acc, curr) => acc + curr.price * curr.quantity,
                      0
                    )}
                  </strong>
                </p>
                <button
                  onClick={checkUserLogin}
                  type="button"
                  disabled={orderMeals.length < 1}
                  className="checkout-btn"
                >
                  Next
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
