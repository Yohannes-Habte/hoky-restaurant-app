import React from 'react';
import './Home.scss';
import Slider from '../../compenents/dishAdvertisement/MealAdvert';
import HomeInfoBox from '../../compenents/homeInfo/HomeInfoBox';
import { Helmet } from 'react-helmet-async';
import CarouselDishItems from '../../compenents/carousel/carouselItem/CarouselDishItems';
import EriEthioMeatMeals from '../../compenents/carousel/dishes/EriEthioMeatMeals';
import EriEthioVeganMeals from '../../compenents/carousel/dishes/EriEthioVeganMeals';
import EriEthioMixedMeals from '../../compenents/carousel/dishes/EriEthioMixedMeals';
import EastAfricanMeals from '../../compenents/carousel/dishes/EastAfricanMeals';
import SectionHeader from '../../compenents/sectionHeader/SectionHeader';
import { eastAfricanDishesData, meatDishesData, mixedDishesData, veganDishesData } from '../../data/Data';

// Page heading component for the Home.jsx
/** 
const PageHeading = ({ heading, button }) => {
  return (
    <section className="heading">
      <h1 className="title"> {heading} </h1>
      <button className="button"> {button} </button>
    </section>
  );
};
*/
const Home = () => {
  //& Step 3: Map the meals based on category from database

  // Eritrean and Ethiopian favourite meat dishes from the backend
  const eriEthioMeatDishes = meatDishesData.map((dish) => (
    <div key={dish.id}>
      <CarouselDishItems
        name={dish.name}
        price={dish.price}
        description={dish.description}
        imageurl={dish.imageurl}
      />
    </div>
  ));

  // Eritrean and Ethiopian favourite Vegan dishes from the backend
  const eriEthioVeganDishes = veganDishesData.map((dish) => (
    <div key={dish.id}>
      <CarouselDishItems
        name={dish.name}
        price={dish.price}
        description={dish.description}
        imageurl={dish.imageurl}
      />
    </div>
  ));

  // Eritrean and Ethiopian favourite Vegan dishes from the backend
  const eriEthioMixedDishes = mixedDishesData.map((dish) => (
    <div key={dish.id}>
      <CarouselDishItems
        name={dish.name}
        price={dish.price}
        description={dish.description}
        imageurl={dish.imageurl}
      />
    </div>
  ));

  // East African dishes from the backend
  const eastAfricanDishes = eastAfricanDishesData.map((dish) => (
    <div key={dish.id}>
      <CarouselDishItems
        name={dish.name}
        price={dish.price}
        description={dish.description}
        imageurl={dish.imageurl}
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

      <section className="home-container">
        {/* Service Information box */}
        <HomeInfoBox />

        {/* Eri-Ethiopian Favourite Organic Meat Dishes */}
        <section className="category">
          <SectionHeader
            heading={'Eri-Ethiopian Favourite Organic Meat Dishes'}
            button={'Buy Now >>'}
          />
          {/* //& Step 4: Get meat dishes from the EriEthioMeatMeals*/}
          <EriEthioMeatMeals meatDishes={eriEthioMeatDishes} />
        </section>

        {/* Eri - Ethiopian Organic Vegetarian Dishes */}
        <section className="category">
          <SectionHeader
            heading={'Eri - Ethiopian Organic Vegan Dishes'}
            button={'Buy Now >>'}
          />
          <EriEthioVeganMeals veganDishes={eriEthioVeganDishes} />
        </section>

        {/* Eri - Ethiopian Organic Mixed Dishes */}
        <section className="category">
          <SectionHeader
            heading={'Eri - Ethiopian Organic Mixed Dishes'}
            button={'Buy Now >>'}
          />
          <EriEthioMixedMeals mixedDishes={eriEthioMixedDishes} />
        </section>

        {/* East African Popular Dishes */}
        <section className="category">
          <SectionHeader
            heading={'East African Popular Dishes'}
            button={'Buy Now >>'}
          />
          <EastAfricanMeals eastAfricaFavouriteishes={eastAfricanDishes} />
        </section>
      </section>
    </main>
  );
};

export default Home;
