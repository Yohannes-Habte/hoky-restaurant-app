import React from 'react';
import './Navbar.scss';
import { PiSquaresFourLight } from 'react-icons/pi';
import { FaRegBell, FaSearch } from 'react-icons/fa';
import { BsCircleHalf } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import HandleData from '../../functions/HandleData';

const Navbar = () => {
  // Global state variables and displaying user name
  const { data, loading, error } = HandleData(
    'http://localhost:5000/api/users/user/name'
  );

  const { data: photo } = HandleData(
    'http://localhost:5000/api/users/user/photo'
  );
  console.log('Admin name is:', data);
  return (
    <nav className="navbar">
      <h2 className="logo">
        <NavLink className={'church-name'} to={'/'}>
          Hoky Restaurant
        </NavLink>
      </h2>

      {/* Search container */}
      <div className="search">
        <input type="text" placeholder="Search..." className="navbar-input" />
        <FaSearch className="search-icon" />
      </div>

      <div className="loggedIn-user">
        {data ? <span className="user-name"> {data} </span> : ''}
        <figure className="image-container">
          <img
            className="user-photo"
            src={
              photo
                ? photo
                : 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
            }
            alt=""
          />
        </figure>
      </div>
    </nav>
  );
};

export default Navbar;
