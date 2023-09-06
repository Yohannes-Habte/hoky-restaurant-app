import React from 'react';
import './Home.scss';
import Slider from '../../compenents/slider/Slider';
import HomeInfoBox from '../../compenents/homeInfo/HomeInfoBox';
import { VeganMeals, dishData } from '../../data/Data';
import CarouselItem from '../../compenents/carouselItem/CarouselItem';
import MealsCarousel from '../../compenents/carousel/MealsCarousel';
import MealsCategory from '../../compenents/mealsCategory/MealsCategory';
import VeganCarousel from '../../compenents/carousel/VeganCarousel';
import { Helmet } from 'react-helmet-async';

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
  const availableDishes = dishData.map((item, index) => (
    <div key={index}>
      <CarouselItem
        name={item.name}
        price={item.price}
        description={item.description}
        imageurl={item.imageurl}
      />
    </div>
  ));

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

  return (
    <main className="home-page">
      <Helmet>
        <title>Home Page </title>
      </Helmet>

      <Slider />
      <HomeInfoBox />

      {/* Lates Meals */}
      <section className="container">
        <PageHeading heading={'Latest Meals'} button={'Buy Now >>'} />
        {/* //& Step 4: Get dishes from the MealsCarousel*/}
        <MealsCarousel dishes={availableDishes} />
      </section>

      {/* Meals Category */}
      <section className="categories">
        <h3 className="categories-title"> Meals Categories</h3>
        <div className="horizontal-line"></div>
        <MealsCategory />
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
