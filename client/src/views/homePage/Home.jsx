import React from 'react';
import './Home.scss';
import Slider from '../../compenents/dishAdvertisement/MealAdvert';
import HomeInfoBox from '../../compenents/homeInfo/HomeInfoBox';
import { VeganMeals, meatDishesData, traditionalDishes } from '../../data/Data';
import CarouselItem from '../../compenents/carouselItem/CarouselItem';
import VeganCarousel from '../../compenents/carousel/VeganCarousel';
import { Helmet } from 'react-helmet-async';
import TraditionalDishes from '../../compenents/carousel/TraditionalDishes';
import MeatDishes from '../../compenents/carousel/MeatDishes';

const PageHeading = ({ heading, button }) => {
  return (
    <React.Fragment>
      <section className="heading">
        <h1 className="title"> {heading} </h1>
        <button className="button"> {button} </button>
      </section>
      <div className="horizontal-line"></div>
    </React.Fragment>
  );
};
const Home = () => {
  //& Step 3: Map the dishData from database (dishData)

  // Traditional dishes
  const availableTraditionalDishes = traditionalDishes.map((item, index) => (
    <div key={index}>
      <CarouselItem
        name={item.name}
        price={item.price}
        description={item.description}
        imageurl={item.imageurl}
      />
    </div>
  ));

  // Vegan dishes
  const vegetarianMeals = VeganMeals.map((item, index) => (
    <div key={index}>
      <CarouselItem
        name={item.name}
        price={item.price}
        description={item.description}
        imageurl={item.imageurl}
      />
    </div>
  ));

  // Meat Meals dishes
  const mixedMeals = meatDishesData.map((item, index) => (
    <div key={index}>
      <CarouselItem
        name={item.name}
        price={item.price}
        description={item.description}
        imageurl={item.imageurl}
      />
    </div>
  ));

  return (
    <main className="home-page">
      <Helmet>
        <title>Home Page </title>
      </Helmet>

      {/* Dishes Advertisement using slider */}
      <Slider />

      {/* Service Information box */}
      <HomeInfoBox />

      {/* Lates Meals */}
      <section className="container">
        <PageHeading heading={'Latest Meals'} button={'Buy Now >>'} />
        {/* //& Step 4: Get dishes from the MealsCarousel*/}
        <TraditionalDishes dishes={availableTraditionalDishes} />
      </section>

      {/* Meat Dishes */}
      <section className="categories">
        <PageHeading heading={'Meat Meals'} button={'Buy Now >>'} />
        <MeatDishes dishes={mixedMeals} />
      </section>

      {/* Vegan Meals */}
      <section className="container">
        <PageHeading heading={'Vegan Meals'} button={'Buy Now >>'} />
        <VeganCarousel veganDishes={vegetarianMeals} />
      </section>
    </main>
  );
};

export default Home;
