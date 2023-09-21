import React from 'react';
import './About.scss';
import { Helmet } from 'react-helmet-async';
import { aboutHoky } from '../../data/Data';

const About = () => {
  return (
    <main className="about-page">
      <Helmet>
        <title>About Page </title>
      </Helmet>

      <section className="about-container">
        <h1 className="title">Welcome to the Hoky Restaturant!</h1>
        {aboutHoky.map((about) => {
          return (
            <article key={about._id} className="about-contents">
              <aside className="text-content">
                <h2 className="sub-title"> {about.title} </h2>
                <p className="paragraph"> {about.paragraph1} </p>
                <p className="paragraph"> {about.paragraph2} </p>
              </aside>
              <figure className="image-cotainer">
                <img className="image" src={about.image} alt={about.title} />
              </figure>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default About;
