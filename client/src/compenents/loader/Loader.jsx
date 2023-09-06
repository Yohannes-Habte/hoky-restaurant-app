import React from 'react';
import './Loader.scss';
import ReactDOM from 'react-dom';
import loader from '../../assets/loader.gif';


/** 
 The loader that covers the whole screen requires two things
  1. In the index.html (in public folder) include "<div id="loader"></div>"
  2. import ReactDOM from 'react-dom'
  3. add comma ,
  4. Where do you want to display: document.getElementById("loader")
*/

export const EntirePageLoader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loader} alt="Loading" />
      </div>
    </div>,
    document.getElementById('loader')
  );
};

// Loader for a specific section in a page
export const Spinner = () => {
  return (
    <div className="spinner">
      <img src={loader} alt="Loading" width={50} />
    </div>
  );
};
