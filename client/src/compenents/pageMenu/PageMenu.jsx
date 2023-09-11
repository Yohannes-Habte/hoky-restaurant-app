import React from 'react';
import './PageMenu.scss';
import { NavLink } from 'react-router-dom';

const PageMenu = () => {
  // Active NavLink styling
  const activeLink = ({ isActive }) =>
    isActive ? `active-link` : 'passive-link';

  return (
    <div className="page-menu">
      <nav className="page-navbar">
        <ul className="page-list-items">
          <li className="list-item">
            <NavLink to={'/profile'} className={activeLink}>
              Profile
            </NavLink>
          </li>

          <li className="list-item">
            <NavLink to={'/wallet'} className={activeLink}>
              My Wallet
            </NavLink>
          </li>

          <li className="list-item">
            <NavLink to={'/wishlist'} className={activeLink}>
              Wishlist
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PageMenu;
