import React, { createContext } from 'react';
import { useReducer } from 'react';
import BgReducer from './BgReducer';

// Initial State
const initialState = {
  dark: false,
  gray: false,
  ghost: false,
};

// Create context
export const bgContext = createContext(initialState);

const BgProdiver = ({ children }) => {
  const [state, dispatch] = useReducer(BgReducer, initialState);
  return (
    <bgContext.Provider
      value={{
        dark: state.dark,
        gray: state.gray,
        ghost: state.ghost,
        dispatch,
      }}
    >
      {children}
    </bgContext.Provider>
  );
};

export default BgProdiver;
