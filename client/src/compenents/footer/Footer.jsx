import React from 'react';
import './Footer.scss';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <div className="footer-sections">
        <section className="footer-section">
          <h3 className="subTitle">Hoky Restaurant</h3>
          <ul className="footer-list-items">
            <li className="list-item">
              <NavLink to={'/teams'} className={'nav-link'}>
                Our Team
              </NavLink>
            </li>
            <li className="list-item">
              <NavLink to={'/rewards'} className={'nav-link'}>
                Rewards
              </NavLink>
            </li>
            <li className="list-item">
              <NavLink to={'/clients'} className={'nav-link'}>
                Clients
              </NavLink>
            </li>
            <li className="list-item">
              <NavLink to={'/imprint'} className={'nav-link'}>
                Imprint
              </NavLink>
            </li>
          </ul>
        </section>

        <section className="footer-section">
          <h3 className="subTitle">Sitemap</h3>
          <ul className="footer-list-items">
            <li className="list-item">
              <NavLink to={'/about'} className={'nav-link'}>
                About
              </NavLink>
            </li>
            <li className="list-item">
              <NavLink to={'/meals'} className={'nav-link'}>
                Meals
              </NavLink>
            </li>
            <li className="list-item">
              <NavLink to={'/career'} className={'nav-link'}>
                Career
              </NavLink>
            </li>
            <li className="list-item">
              <NavLink to={'/contact'} className={'nav-link'}>
                Contact
              </NavLink>
            </li>
          </ul>
        </section>

        <section className="footer-section">
          <h3 className="subTitle">Social Media</h3>
          <ul className="footer-list-items">
            <li className="list-item">
              <a
                className={'nav-link'}
                href="https://www.facebook.com/profile.php?id=100009710022882"
                target="_blank"
              >
                Facebook
              </a>
            </li>
            <li className="list-item">
              <a
                className={'nav-link'}
                href="https://www.linkedin.com/in/yohannes-habtemariam/"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
            <li className="list-item">
              <a
                className={'nav-link'}
                href="https://www.youtube.com/"
                target="_blank"
              >
                Youtube
              </a>
            </li>
            <li className="list-item">
              <a className={'nav-link'} href="https://twitter.com/">
                Twitter
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="copyright"> &copy; {year} All Rights Reserved!</div>
    </footer>
  );
};

export default Footer;
