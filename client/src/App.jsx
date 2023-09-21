import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/homePage/Home';
import About from './views/aboutPage/About';
import Contact from './views/contactPage/Contact';
import NotFound from './views/notFoundPage/NotFound';
import Header from './compenents/header/Header';
import Meals from './views/mealsPage/Meals';
import Footer from './compenents/footer/Footer';
import Login from './views/loginPage/Login';
import Register from './views/registerPage/Register';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserCartContext } from './context/userCart/UserCartProvider';
import { USER_CART_ACTION } from './context/userCart/UserCartReducer';
import Profile from './views/ProfilePage/Profile';
import Reservation from './views/reservation Page/Reservation';
import Menu from './views/menuPage/Menu';

const App = () => {
  // Global state variables
  const { dispatch } = useContext(UserCartContext);
  //& The credentials will work with every http request and send the token
  axios.defaults.withCredentials = true;

  //& To access the login status of user, you need to use useEffect hook as follows

  //! This is used to keep the current user logged in even if it is refreshed again and again
  useEffect(() => {
    const loginStatus = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BACKEND_URL + '/api/users/user/loginStatus'
        );
        dispatch({ type: USER_CART_ACTION.IS_USER_LOGGED_IN, payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    loginStatus();
  }, []);

  return (
    <div>
      <Router>
        <ToastContainer position="bottom-center" limit={1} />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/Gallery" element={<Meals />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
