import React, { useReducer } from 'react';
import { createContext } from 'react';
import UserReducer from './UserReducer';

// Initial State
const initialState = {
  user: null,
  loading: false,
  error: '',
};

export const UserContext = createContext(initialState);
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        dispatch,
        user: state.user,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
