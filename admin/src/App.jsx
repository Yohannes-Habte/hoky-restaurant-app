import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/homePage/Home';
import Login from './views/loginPage/Login';
import MealsList from './views/listPages/MealsList';
import MenuList from './views/listPages/MenuList';
import Reservations from './views/reservationPage/Reservations';
import Comments from './views/commentPage/Comments';
import NotFound from './views/notFoundPage/NotFound';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/meals" element={<MealsList />} />
          <Route path="/menus" element={<MenuList />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
