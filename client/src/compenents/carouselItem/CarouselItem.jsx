import React from 'react';
import './CarouselItem.scss';
import { Link } from 'react-router-dom';
import { ShortenText } from '../../utiles/Utiles';

//& Step 2: Get all the data from the Data.js (dishData)
const CarouselItem = ({ imageurl, name, price, description }) => {
  return (
    <div className="carouselItem">
      <Link to={'/product-details'}>
        <img className="image" src={imageurl} alt="Meal" />
        <p className="price"> {price} </p>
        <h4> {name} </h4>
        <p className="--mb"> {ShortenText(description, 26)} </p>
      </Link>

      <button className="addToCart-btn">Add To Cart </button>
    </div>
  );
};

export default CarouselItem;
