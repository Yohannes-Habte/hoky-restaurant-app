import React, { createContext, useReducer } from 'react';
import ReservationReducer from './ReservationReducer';

// Initial state
const initialState = {
  reservation: null,
  error: '',
  loading: false,
};

export const reservationContext = createContext(initialState);
const ReservationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReservationReducer, initialState);

  return (
    <reservationContext.Provider
      value={{
        dispatch,
        reservation: state.reservation,
        error: state.error,
        loading: state.loading,
      }}
    >
      {children}
    </reservationContext.Provider>
  );
};

export default ReservationProvider;
