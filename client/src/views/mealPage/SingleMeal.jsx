import React, { useContext } from 'react';
import Fetch from '../../globalFunction/GlobalFunction';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import Rating from '../../compenents/rating/Rating';
import { UserCartContext } from '../../context/userCart/UserCartProvider';
import axios from 'axios';
import { USER_CART_ACTION } from '../../context/userCart/UserCartReducer';
import { toast } from 'react-toastify';
import ErrorMessage from '../../compenents/messages/ErrorMessage';
import PageSpinner from '../../compenents/loader/PageSpinner';
import './SingleMeal.scss';

const SingleMeal = () => {
  // Navigate to cart page
  const navigate = useNavigate();
  // Find product ID using useLocation() hook
  const location = useLocation();
  const mealId = location.pathname.split('/')[2];

  // Global state variables from the global function to display specific meal 
  const { data: meal, loading, error } = Fetch(`/api/meals/${mealId}`);

  // Global state variables from the user cart context (UserCartContext)
  const { cartMeals, dispatch } = useContext(UserCartContext);

  // Function to add to cart
  const addToCart = async () => {
    try {
      const existingMeal = cartMeals.find((item) => item._id === meal._id);
      const quantity = existingMeal ? existingMeal.quantity + 1 : 1;
      const { data } = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/meals/${meal._id}`
      );
      if (meal.quantity < quantity) {
        window.alert(
          'Sorry, this is the last meal in the stock. Please contact us to meet your needs!'
        );
        return;
      } else {
        dispatch({
          type: USER_CART_ACTION.ADD_MEAL_TO_CART,
          payload: { ...meal, quantity },
        });
      }
      navigate('/cart');
    } catch (err) {
      console.log(err);
      toast.error(ErrorMessage(err));
    }
  };

  return (
    <main className="meal-page">
      <Helmet>
        <title> Meal </title>
      </Helmet>

      {loading ? (
        <PageSpinner />
      ) : error ? (
        error
      ) : (
        <section className="meal-container">
          <h1 className="title"> {meal.name} </h1>
          <div className="meal-details">
            {/* Meal image */}
            <figure className="image-container">
              <img className="image" src={meal.image} alt={meal.name} />
            </figure>

            <div className="wrapper">
              {/* Meal description */}
              <article className="meal-description">
                <h3 className="subTitle"> {meal.name} </h3>

                <p className="paragraph">
                  <strong>Description</strong>: {meal.description}
                </p>
              </article>

              {/* Meal Availability */}
              <aside className="meal-availability">
                <h3 className="subTitle">Price: ${meal.price}</h3>
                <span className="rating-container">
                  Rating: <Rating rating={meal.rating} />
                </span>

                {/*  How to manage meal  stock   */}
                <div className="status-container">
                  <strong>Status:</strong>
                  {meal.quantity > 0 ? (
                    <span>
                      <span className="in-stock"> In Stock</span>
                      <div className="btn-container">
                        <button onClick={addToCart} className="sigle-meal-btn">
                          Add to Cart
                        </button>
                      </div>
                    </span>
                  ) : (
                    <span className="out-of-stock"> Out of stock </span>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default SingleMeal;
