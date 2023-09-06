import React from 'react';
import './MealsCategory.scss';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: 'Gadgets',
    image: 'https://i.ibb.co/5GVkd3m/c1.jpg',
  },
  {
    id: 2,
    title: 'Womens Fashion',
    image: 'https://i.ibb.co/nQKLjrW/c2.jpg',
  },
  {
    id: 3,
    title: 'Sport Sneakers',
    image: 'https://i.ibb.co/fNkBYgr/c3.jpg',
  },
];

const Category = ({ title, image }) => {
  const navigate = useNavigate();
  return (
    <article className="category">
      <h3 category-title>{title}</h3>
      <img className="image" src={image} alt="img" />
      <button className="category-btn" onClick={() => navigate('/meals')}>
        {'Shop Now >>>'}
      </button>
    </article>
  );
};

const MealsCategory = () => {
  return (
    <div className="meals-categories">
      {categories.map((category) => {
        return (
          <article key={category.id} >
            <Category
              title={category.title}
              image={category.image}
            />
          </article>
        );
      })}
    </div>
  );
};

export default MealsCategory;
