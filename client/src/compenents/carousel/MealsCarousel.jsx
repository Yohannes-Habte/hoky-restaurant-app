import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../../data/Data';

//& Step 1: Import Carousel, CSS and Reponsive.The dishes = availableDishes in Home.jsx
const MealsCarousel = ({ dishes }) => {
  return (
    <div>
      <Carousel
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all 500ms ease"
        transitionDuration={1000}
      >
        {dishes}
      </Carousel>
    </div>
  );
};

export default MealsCarousel;
