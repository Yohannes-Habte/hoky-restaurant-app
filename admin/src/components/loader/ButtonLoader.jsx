import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';


const ButtonLoader = () => {
  return (
    <ClipLoader
      color={'green'}
      cssOverride={{ marginTop: 4 }}
      size={30}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default ButtonLoader;
