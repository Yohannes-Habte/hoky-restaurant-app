import React from 'react';
import './NotFound.scss';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <main>
      <Helmet>
        <title> Not Found </title>
      </Helmet>
      
      <h1>Page Not Found </h1>
    </main>
  );
};

export default NotFound;
