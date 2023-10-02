import React from 'react';
import Alert from 'react-bootstrap/Alert';

const MessageBox = (color) => {
  return <Alert variant={color.variant || 'info'}>{color.children}</Alert>;
};

export default MessageBox;
