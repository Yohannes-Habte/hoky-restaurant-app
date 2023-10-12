import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
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
import { bgContext } from './context/bgColors/BgProdiver';
import HandleData from './functions/HandleData';
import './styles/Dark.scss';
import './styles/Gray.scss';
import './styles/Ghost.scss';

const App = () => {
  //& The credentials will work with every http request and send the token
  axios.defaults.withCredentials = true;

  // Backgournd colors global variables
  const { dark, gray, ghost } = useContext(bgContext);

  // Global state variables and displaying user name
  const { data, loading, error } = HandleData(
    'http://localhost:5000/api/users/user/name'
  );

  // Route Protection function from accessing non-admin users

  const ProtectedRoute = ({ children }) => {
    if (!data) {
      return <Navigate to={'/login'} />;
    }
    return children;
  };

  return (
    <div
      className={
        dark ? 'app dark' : gray ? 'app gray' : ghost ? 'app ghost' : 'app'
      }
    >
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
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meals"
            element={
              <ProtectedRoute>
                <MealsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/drinks"
            element={
              <ProtectedRoute>
                <DrinksList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations"
            element={
              <ProtectedRoute>
                <ReservationList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/comments"
            element={
              <ProtectedRoute>
                <Comments />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
