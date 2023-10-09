import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserCartProvider from './context/userCart/UserCartProvider';
import { HelmetProvider } from 'react-helmet-async';
import ReservationProvider from './context/reservation/ReservationProvider';
import OrderProvider from './context/order/OrderProvider';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserCartProvider>
      <ReservationProvider>
        <OrderProvider>
          <HelmetProvider>
            <PayPalScriptProvider deferLoading={true}>
              <App />
            </PayPalScriptProvider>
          </HelmetProvider>
        </OrderProvider>
      </ReservationProvider>
    </UserCartProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
