import React from 'react';
import './Meals.scss';
import { Helmet } from 'react-helmet-async';
import Fetch from '../../globalFunction/GlobalFunction';
import PageSpinner from '../../compenents/loader/PageSpinner';
import ErrorMessage from '../../compenents/messages/ErrorMessage';
import { toast } from 'react-toastify';

const Meals = () => {
  const { data, loading, error } = Fetch('/api/meals');
  return (
    <main className="meals-page">
      <Helmet>
        <title> Meals </title>
      </Helmet>

      <section className="meals-container">
        <h1 className="title"> Eritrean and Ethiopian Foods</h1>
        <p className="paragraph">
          Eritrean and Ethiopian exciting dishes and exotic recipes from the
          horn of Africa are the order of the day for us. If you don't try our
          in-house recipes, sauces and drinks , you're missing out on a real
          culinary delight! Of course, the classics of Vietnamese cuisine such
          as pho soups and rice noodles, crispy spring rolls and wok dishes with
          exotic, hot spices can also be found on our menu - of course also as
          vegetarian or vegan . Get an insight into our charming restaurant and
          join us on a culinary journey of discovery to the Far East!
        </p>

        {loading ? (
          <PageSpinner />
        ) : error ? (
          // <MessageBox variant="danger"> {error} </MessageBox>
          toast.error(ErrorMessage(error))
        ) : (
          <div className="meals">
            {data.map((meal) => {
              return (
                <figure key={meal._id} className="image-conatiner">
                  <img className="image" src={meal.image} alt={meal.name} />
                </figure>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Meals;
