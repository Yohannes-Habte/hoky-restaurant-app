import React from 'react';

// Global Error handler
const ErrorMessage = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export default ErrorMessage;
