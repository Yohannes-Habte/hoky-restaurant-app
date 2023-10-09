import React, { createContext, useReducer } from 'react';
import UserCartReducer from './UserCartReducer';

// Initial state variable
const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,

  isLoggedIn: false,

  cart: {
    orderMeals: localStorage.getItem('cartMeals')
      ? JSON.parse(localStorage.getItem('cartMeals'))
      : [],

    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,

    // Since it is string, you do not need "JSON.parse"
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
  },

  loading: false,

  error: '',
};

// User and Cart Context
export const UserCartContext = createContext(initialState);

const UserCartProvider = ({ children }) => {
  // State variable using useReducer Hook
  const [state, dispatch] = useReducer(UserCartReducer, initialState);

  return (
    <UserCartContext.Provider
      value={{
        dispatch,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        cart: state.cart,
        orderMeals: state.cart.orderMeals,
        paymentMethod: state.cart.paymentMethod,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </UserCartContext.Provider>
  );
};

export default UserCartProvider;
