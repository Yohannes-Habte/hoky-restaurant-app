import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => {
  // Local state variable
  const [menu, setMenu] = useState([]);

  // UseEffect to display user inputs
  useEffect(() => {
    const fetchInputs = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/forms/sidebar-items'
        );
        setMenu(data);
      } catch (error) {}
    };
    fetchInputs();
  }, []);

  return (
    <section className="sidebar">
      <h2 className="subTitle">Navigation</h2>
      {menu.map((item) => {
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
      })}
      <article className="backgroung-color">
        <h4 className="bg-title"> Background Color</h4>
        <div className="color-options">
          <div className="color-option"></div>

          <div className="color-option"></div>

          <div className="color-option"></div>
        </div>
      </article>
    </section>
  );
};

export default Sidebar;
