import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShortenText } from '../../../utiles/Utiles';
import { UserCartContext } from '../../../context/userCart/UserCartProvider';
import axios from 'axios';
import { USER_CART_ACTION } from '../../../context/userCart/UserCartReducer';
import ButtonSpinner from '../../loader/ButtonSpinner';
import PageSpinner from '../../loader/PageSpinner';
import { toast } from 'react-toastify';
import ErrorMessage from '../../messages/ErrorMessage';
import './Meal.scss';

//& Step 2: Get the data from the Home.jsx through Distructuring the object
const Meal = ({ dish }) => {
  // Global state variables
  const { orderMeals, dispatch, loading, error } = useContext(UserCartContext);

  // Add to cart from the landing page
  const addToCart = async () => {
    try {
      const existingMeal = orderMeals.find((item) => item._id === dish._id);
      const quantity = existingMeal ? existingMeal.quantity + 1 : 1;
      const { data } = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/meals/${dish._id}`
      );
      if (data.quantity < quantity) {
        window.alert(
          'Sorry, this dish is out of stock. Please contact us to meet your needs!'
        );
        return;
      } else {
        dispatch({
          type: USER_CART_ACTION.ADD_MEAL_TO_CART,
          payload: { ...dish, quantity },
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(ErrorMessage(err));
    }
  };

  return (
    <div className="carousel-dish-item">
      {loading ? (
        <PageSpinner />
      ) : error ? (
        error
      ) : (
        <Link to={`meals/${dish._id}`}>
          <figure className="image-container">
            <img className="image" src={dish.image} alt="Meal" />
          </figure>
          <article className="dish-name-price-container">
            <h4 className="dish-name"> {dish.name} </h4>
            <p className="dish-price"> €{dish.price} </p>
          </article>

          <p className="paragraph"> {ShortenText(dish.description, 40)} </p>
        </Link>
      )}

      {dish.quantity === 0 ? (
        <button
          onClick={() => addToCart(dish)}
          disabled={dish.quantity === 0}
          className="addToCart-btn empty-stock-btn"
        >
          Out of Stock
        </button>
      ) : (
        <button onClick={() => addToCart(dish)} className="addToCart-btn">
          {loading && <ButtonSpinner />}
          {loading && <span>Loading...</span>}
          {!loading && <span> Add To Cart</span>}
        </button>
      )}
    </div>
  );
};

export default Meal;
