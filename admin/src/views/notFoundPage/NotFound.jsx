import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { NavLink } from 'react-router-dom';
import './NotFound.scss';
import { BsArrowRightShort } from 'react-icons/bs';

const NotFound = () => {
  return (
    <main className="page-notFound">
      <article className="not-found">
        <h1 className="title">Page Not Found!</h1>
        <p className="paragraph">
          <BsArrowRightShort />
          <NavLink to={'/'} className={'link'}>
            Got to Home Page
          </NavLink>
          <BsArrowRightShort />
        </p>
      </article>
    </main>
  );
};

export default NotFound;
