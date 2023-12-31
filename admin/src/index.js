import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserProvider from './context/user/UserProvider';
import { HelmetProvider } from 'react-helmet-async';
import ProductsProvider from './context/products/ProductsProvider';
import BgProdiver from './context/bgColors/BgProdiver';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ProductsProvider>
        <BgProdiver>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </BgProdiver>
      </ProductsProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
