import React from 'react';
import './Home.scss';
import Slider from '../../compenents/dishAdvertisement/MealAdvert';
import { Helmet } from 'react-helmet-async';
import EriEthioMeatMeals from '../../compenents/carousel/mealCategories/EriEthioMeatMeals';
import EriEthioVeganMeals from '../../compenents/carousel/mealCategories/EriEthioVeganMeals';
import EriEthioMixedMeals from '../../compenents/carousel/mealCategories/EriEthioMixedMeals';
import EastAfricanMeals from '../../compenents/carousel/mealCategories/EastAfricanMeals';
import SectionHeader from '../../compenents/sectionHeader/SectionHeader';
import Fetch from '../../globalFunction/GlobalFunction';
import Meal from '../../compenents/carousel/meal/Meal';
import HomeInfoBox from '../../compenents/homeInfo/HomeInfoBox';

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
  // Global variables and useEffect functions

  // Meats Category
  const { data, loading, error } = Fetch('/api/meals/categories/meats');

  // Meats Category
  const { data: veganData } = Fetch('/api/meals/categories/vegan');

  // Meats Category
  const { data: mixedMealsData } = Fetch('/api/meals/categories/mixed');

  // Meats Category
  const { data: eastAfricaDishes } = Fetch(
    '/api/meals/categories/east-africa-dishes'
  );
  //& Step 3: Map the meals based on category from database
  // Eritrean and Ethiopian favourite meat dishes from the backend
  const eriEthioMeatDishes = data.map((dish) => (
    <div key={dish._id}>
      <Meal dish={dish} />
    </div>
  ));

  // Eritrean and Ethiopian favourite Vegan dishes from the backend
  const eriEthioVeganDishes = veganData.map((dish) => (
    <div key={dish._id}>
      <Meal dish={dish} />
    </div>
  ));

  // Eritrean and Ethiopian favourite Vegan dishes from the backend
  const eriEthioMixedDishes = mixedMealsData.map((dish) => (
    <div key={dish._id}>
      <Meal dish={dish} />
    </div>
  ));

  // East African dishes from the backend
  const eastAfricanDishes = eastAfricaDishes.map((dish) => (
    <div key={dish._id}>
      <Meal dish={dish} />
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
