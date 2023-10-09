import React, { createContext, useReducer } from 'react';
import reducer from './OrderReducer';

// initial State
const initialState = {
  order: {},
  error: '',
  loading: false,
  successPay: false,
  loadingPay: false,
  successDeliver: false,
};

export const GetOrderContext = createContext(initialState);

const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GetOrderContext.Provider
      value={{
        order: state.order,
        error: state.error,
        loading: state.loading,
        successPay: state.successPay,
        loadingPay: state.loadingPay,
        successDeliver: state.successDeliver,
        dispatch,
      }}
    >
      {children}
    </GetOrderContext.Provider>
  );
};

export default OrderProvider;
