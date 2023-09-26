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

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/meals" element={<MealsList />} />
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
