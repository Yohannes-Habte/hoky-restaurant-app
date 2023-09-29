import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { UserCartContext } from '../../context/userCart/UserCartProvider';
import { USER_CART_ACTION } from '../../context/userCart/UserCartReducer';

// Global Logo of Hoky Restaurant
export const logo = (
  <div className="logo-container">
    <NavLink to={'/'} className={'logo'}>
      <span className="hobtom">H</span>
      <span className="okuba">o</span>
      <span className="kisanet">k</span>
      <span className="yohannes">y</span>
    </NavLink>
  </div>
);

const Header = () => {
  const navigate = useNavigate();
  // Global state variable
  const { user, isLoggedIn, dispatch } = useContext(UserCartContext);

  // Local state variables
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);

  // User sign out Function
  const logoutUser = () => {
    dispatch({ type: USER_CART_ACTION.USER_LOG_OUT });
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  //! Show on logged in user
  const ShowOnLoggedIn = ({ children }) => {
    if (isLoggedIn) {
      return children;
    } else {
      return null;
    }
  };

  //! Show on logout user
  const ShowOnLogout = ({ children }) => {
    if (!isLoggedIn) {
      return children;
    } else {
      return null;
    }
  };

  // Handle menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  // Logout user
  const logout = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL + '/api/users/user/logout'
    );

    dispatch({ type: USER_CART_ACTION.USER_LOG_OUT, payload: data });
    navigate('/login');
  };

  // Active NavLink styling
  const activeLink = ({ isActive }) => (isActive ? `active` : 'passive');

  // Local Shopping cart component
  const shoppingCart = (
    <span className="cart-info">
      <NavLink to={'/cart'} className={activeLink}>
        Cart
        <FaShoppingCart size={20} className="shopping-icon" />
        <p className="quantity"> 0 </p>
      </NavLink>
    </span>
  );

  return (
    <header className={'header'}>
      {/* logo  */}
      {logo}

      {/* Navbar items */}
      <nav
        className={
          showMenu ? 'navbar-container activeMode' : 'navbar-container'
        }
      >
        <ul className="navbar-items">
          <li onClick={hideMenu} className="navbar-item">
            <NavLink to={'/'} className={activeLink}>
              Home
            </NavLink>
          </li>

          <li onClick={hideMenu} className="navbar-item">
            <NavLink to={'/about'} className={activeLink}>
              About
            </NavLink>
          </li>

          <li onClick={hideMenu} className="navbar-item">
            <NavLink to={'/menu'} className={activeLink}>
              Menu
            </NavLink>
          </li>

          <li onClick={hideMenu} className="navbar-item">
            <NavLink to={'/gallery'} className={activeLink}>
              Gallery
            </NavLink>
          </li>

          <li onClick={hideMenu} className="navbar-item">
            <NavLink to={'/reservation'} className={activeLink}>
              Reservation
            </NavLink>
          </li>

          <li onClick={hideMenu} className="navbar-item">
            <NavLink to={'/contact'} className={activeLink}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header-right">
        <span className="login-register-order">
          <ShowOnLogout>
            <NavLink to={'/login'} className={activeLink}>
              Login
            </NavLink>
            <NavLink to={'/register'} className={activeLink}>
              Register
            </NavLink>
          </ShowOnLogout>

          <ShowOnLoggedIn>
            <NavLink to={'/order-history'} className={activeLink}>
              My Order
            </NavLink>
            <NavLink to={'/profile'} className={activeLink}>
              Profile
            </NavLink>
            <NavLink to={'/logout'} onClick={logout}>
              Logout
            </NavLink>
          </ShowOnLoggedIn>
        </span>

        {/* Shopping cart */}
        {shoppingCart}

        <div onClick={toggleMenu} className="hamburger-icon">
          <i className={showMenu ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
