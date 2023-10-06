import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../../../data/Data';

//& Step 1: Import Carousel, CSS and Reponsive. Then, export it to Home.jsx
const EriEthioMeatMeals = ({ meatDishes }) => {
  return (
    <div>
      <Carousel
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all 500ms ease"
        transitionDuration={1000}
      >
        {meatDishes}
      </Carousel>
    </div>
  );
};

export default EriEthioMeatMeals;
