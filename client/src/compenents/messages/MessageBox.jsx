import React from 'react';
import Alert from 'react-bootstrap/Alert';

// This message box display the message from the backend with preferable background color
// The background color for each meassage is determined by the "color" variable assigned to variant

const MessageBox = (color) => {
  return <Alert variant={color.variant || 'info'}>{color.children}</Alert>;
};

export default MessageBox;
