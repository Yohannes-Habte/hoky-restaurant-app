import React, { createContext, useReducer } from 'react';
import ProductsReducer from './ProductsReducer';

// Initial State
const initialState = {
  meal: null,
  drink: [],
  reservation: [],
  order: [],
  comment: [],
  loading: false,
  error: '',
};

export const ProductsContext = createContext(initialState);
const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState);
  return (
    <ProductsContext.Provider
      value={{
        dispatch,
        meal: state.meal,
        drink: state.drink,
        reservation: state.reservation,
        order: state.order,
        comment: state.comment,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
