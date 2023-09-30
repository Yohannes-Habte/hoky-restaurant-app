import React from 'react';
import './CarouselDishItems.scss';
import { Link } from 'react-router-dom';
import { ShortenText } from '../../../utiles/Utiles';

//& Step 2: Get the data from the Home.jsx through Distructuring the object
const CarouselDishItems = ({ imageurl, name, price, description }) => {
  return (
    <div className="carousel-dish-item">
      <Link to={'/product-details'}>
        <figure className="image-container">
          <img className="image" src={imageurl} alt="Meal" />
        </figure>
        <article className="dish-name-price-container">
          <h4 className="dish-name"> {name} </h4>
          <p className="dish-price"> {price} </p>
        </article>

        <p className="paragraph"> {ShortenText(description, 40)} </p>
      </Link>

      <button className="addToCart-btn">Add To Cart </button>
    </div>
  );
};

export default CarouselDishItems;
