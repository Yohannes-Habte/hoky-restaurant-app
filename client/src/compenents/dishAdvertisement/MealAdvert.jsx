import React, { useEffect, useState } from 'react';
import './MealAdvert.scss';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Fetch from '../../globalFunction/GlobalFunction';

const MealAdvert = () => {
  // Navigate to ....
  const navigate = useNavigate();

  // Global variables and useEffect functions

  // Meats Category
  const { data, loading, error } = Fetch('/api/meals');
  // local state variables
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide length
  const slideLength = data.length;
  const autoScroll = true;
  let slideInterval;
  const intervalTime = 5000;

  // Next slider
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  // Previous slider
  const previousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  // Set current slide to zero
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }

    return () => clearInterval(slideInterval);
  }, [currentSlide, intervalTime, autoScroll]);

  return (
    <div className="slider">
      <FiArrowLeftCircle className="arrow prev" onClick={previousSlide} />

      <FiArrowRightCircle className="arrow next" onClick={nextSlide} />

      {data.map((slider, index) => {
        const { image, name } = slider;
        return (
          <div
            key={index}
            className={index === currentSlide ? 'slide current' : 'slide'}
          >
            {index === currentSlide && (
              <>
                <figure className="image-container">
                  <img className="image" src={image} alt="slide" />
                </figure>
                <div className="content">
                  <span className="span1"></span>
                  <span className="span2"></span>
                  <span className="span3"></span>
                  <span className="span4"></span>
                  <h2> {name} </h2>
                  <hr />
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/meals')}
                  >
                    Buy Now
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MealAdvert;
