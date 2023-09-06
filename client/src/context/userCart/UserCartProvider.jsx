import React, { createContext, useReducer } from 'react';
import UserCartReducer from './UserCartReducer';

// Initial state variable
const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  isLoggedIn: false,
  cart: {
    cartMeals: localStorage.getItem('cartMeals')
      ? JSON.parse(localStorage.getItem('cartMeals'))
      : [],

    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,

    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},

    //& Since it is string, you do not need "JSON.parse"
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
  },
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
        cartItems: state.cart.cartItems,
        shippingAddress: state.cart.shippingAddress,
        paymentMethod: state.cart.paymentMethod,
      }}
    >
      {children}
    </UserCartContext.Provider>
  );
};

export default UserCartProvider;
