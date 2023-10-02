import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/homePage/Home';
import Login from './views/loginPage/Login';
import MealsList from './views/listPages/MealsList';
import Comments from './views/commentPage/Comments';
import NotFound from './views/notFoundPage/NotFound';
import UsersList from './views/listPages/UsersList';
import OrderList from './views/listPages/OrderList';
import ReservationList from './views/listPages/ReservationList';
import DrinksList from './views/listPages/DrinksList';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  //& The credentials will work with every http request and send the token
  axios.defaults.withCredentials = true;

  return (
    <div>
      <Router>
        <ToastContainer
          position="top-right"
          limit={1}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/meals" element={<MealsList />} />
          <Route path="/drinks" element={<DrinksList />} />
          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
