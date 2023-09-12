import React from 'react';
import Carousel from 'react-multi-carousel';
import { responsive } from '../../data/Data';

const MeatDishes = ({ dishes }) => {
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

export default MeatDishes;
