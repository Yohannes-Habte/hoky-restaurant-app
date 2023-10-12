import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import { bgContext } from '../../context/bgColors/BgProdiver';
import { BACKGROUND_ACTION } from '../../context/bgColors/BgReducer';
import HandleData from '../../functions/HandleData';
import PageLoader from '../loader/PageLoader';

const Sidebar = () => {
  // Global backgournd color change state variables
  const { dispatch } = useContext(bgContext);

  // Global state variables for fetching sidebar data
  const { data, loading, error } = HandleData(
    'http://localhost:5000/api/forms/sidebar-items'
  );

  return (
    <section className="sidebar">
      <h2 className="subTitle">Navigation</h2>
      {loading ? (
        <PageLoader />
      ) : error ? (
        error
      ) : (
        data.map((item) => {
          return (
            <div key={item._id} className="items">
              <span className="title"> {item.title} </span>
              {item.listItems.map((listItem) => {
                return (
                  <NavLink
                    className={'link-list-item'}
                    to={listItem.url}
                    key={listItem._id}
                  >
                    <span className="item"> {listItem.itemName} </span>
                  </NavLink>
                );
              })}
            </div>
          );
        })
      )}
      <article className="backgroung-color">
        <h4 className="bg-title"> Background Color</h4>
        <div className="color-options">
          <div
            onClick={() => dispatch({ type: BACKGROUND_ACTION.DARK })}
            className="color-option"
          ></div>

          <div
            onClick={() => dispatch({ type: BACKGROUND_ACTION.GRAY })}
            className="color-option"
          ></div>

          <div
            onClick={() => dispatch({ type: BACKGROUND_ACTION.GHOST })}
            className="color-option"
          ></div>
        </div>
      </article>
    </section>
  );
};

export default Sidebar;
