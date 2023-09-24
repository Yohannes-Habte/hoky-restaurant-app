import React from 'react';
import './Navbar.scss';
import { FiSearch } from 'react-icons/fi';
import { TbSettings } from 'react-icons/tb';
import { PiSquaresFourLight } from 'react-icons/pi';
import { FaRegBell, FaSearch } from 'react-icons/fa';
import { BsCircleHalf } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">
        <NavLink className={'church-name'} to={'/'}>
          Hoky Restaurant
        </NavLink>
      </h2>

         {/* Search container */}
         <div className="search">
          <input
            type="text"
            placeholder="Search..."
            className="navbar-input"
          />
          <FaSearch className="search-icon" />
        </div>

      <div className="icons-user">
        <figure className="icons">
          <PiSquaresFourLight />
          <BsCircleHalf />
        </figure>
        <div className="notification">
          <FaRegBell className="bell" />
          <span className="message-notification">1</span>
        </div>
        <div className="user">
          <img
            className="user-photo"
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
            alt=""
          />
          <span> Habte </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
