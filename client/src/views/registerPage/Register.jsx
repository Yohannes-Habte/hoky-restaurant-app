import React, { useContext, useEffect, useState } from 'react';
import './Register.scss';
import { FaTimes, FaUserAlt } from 'react-icons/fa';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsCheck2All } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utiles/Utiles';
import { Helmet } from 'react-helmet-async';
import { UserCartContext } from '../../context/userCart/UserCartProvider';
import { USER_CART_ACTION } from '../../context/userCart/UserCartReducer';
import ButtonSpinner from '../../compenents/loader/ButtonSpinner';
import ErrorMessage from '../../compenents/messages/ErrorMessage';

// Initial State
const initialSate = {
  firstName: '',
  lastName: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
};
const Register = () => {
  const navigate = useNavigate();

  // Global state variables
  const { dispatch, loading, error } = useContext(UserCartContext);

  // Local state variables
  const [formData, setFormData] = useState(initialSate);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Distructure form data
  const {
    firstName,
    lastName,
    email,
    confirmEmail,
    password,
    confirmPassword,
  } = formData;

  // Input change handle function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [agree, setAgree] = useState(false);
  const [agreeChanged, setAgreeChanged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State variables that shows the condition of the password requirements
  const [letterCase, setLetterCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

  // Password strength checker icons
  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Function that display and hide the fonfirm password
  const displayConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // Function to switch icon
  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    } else {
      return timesIcon;
    }
  };

  useEffect(() => {
    // Check for uppercase and lowercase letters
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setLetterCase(true);
    } else {
      setLetterCase(false);
    }

    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNumber(true);
    } else {
      setNumber(false);
    }

    // Check for special character
    if (password.match(/([§,$,!,%,@,#,^,*,?,_,~])/)) {
      setSpecialCharacter(true);
    } else {
      setSpecialCharacter(false);
    }

    // Check for password length
    if (password.length >= 8) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
  }, [password]);

  // Function to reset all the state variables
  const reset = () => {
    setAgree(false);
    setAgreeChanged(false);
  };

  // Function to register the user
  const SubmitRegisteredUser = async (event) => {
    event.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !confirmEmail ||
      !password ||
      !confirmPassword
    ) {
      return toast.error('Please fill in all fields!');
    }

    if (email !== confirmEmail) {
      return toast.error('Emails did not match!');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords did not match!');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email!');
    }

    dispatch({ type: USER_CART_ACTION.REGISTER_REQUEST });
    try {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/api/auths/register',
        userData,
        { withCredentials: true }
      );

      dispatch({ type: USER_CART_ACTION.REGISTER_SUCCESS, payload: data });
      localStorage.setItem('user', JSON.stringify(data));
      reset();
      return toast.success(
        `${firstName}, you have successfuly created an account!`
      );
    } catch (err) {
      dispatch({
        // Error from the backend
        type: USER_CART_ACTION.REGISTER_FAIL,
        payload: toast.error(ErrorMessage(err)),
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn && success) {
      navigate('/');
    }
  }, [isLoggedIn, success, navigate]);

  return (
    <main className="register-page">
      <Helmet>
        <title> Create Account </title>
      </Helmet>

      <section className="register-container">
        <h1 className="title"> Create Account</h1>
        <fieldset className="register-field">
          {/* <legend className="register-legend"> Sign Up for Free </legend> */}
          <form
            onSubmit={SubmitRegisteredUser}
            action=""
            className="register-form"
          >
            <div className="register-input-fields-container">
              <div className="input-container">
                <FaUserAlt className="input-icon" />
                <input
                  type="text"
                  required
                  name={'firstName'}
                  id={'firstName'}
                  value={firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="input-field"
                />

                <label htmlFor={'firstName'} className="input-label">
                  First Name
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <FaUserAlt className="input-icon" />
                <input
                  type="text"
                  name={'lastName'}
                  id={'lastName'}
                  required
                  value={lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="input-field"
                />

                <label htmlFor={'lastName'} className="input-label">
                  Last Name
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <MdEmail className="input-icon" />
                <input
                  type="email"
                  name={'email'}
                  id={'email'}
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="input-field"
                />
                <label htmlFor={'email'} className="input-label">
                  Email Address
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <MdEmail className="input-icon" />
                <input
                  type="email"
                  name={'confirmEmail'}
                  id={'confirmEmail'}
                  value={confirmEmail}
                  onChange={handleInputChange}
                  placeholder="Confirm Email"
                  className="input-field"
                />
                <label htmlFor="confirmEmail" className="input-label">
                  Email Address
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <RiLockPasswordFill className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name={'password'}
                  id={'password'}
                  value={password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="input-field"
                />
                <label htmlFor={'password'} className="input-label">
                  Password
                </label>
                <span className="input-highlight"></span>
                <span onClick={displayPassword} className="password-display">
                  {showPassword ? (
                    <AiFillEyeInvisible className="icon" />
                  ) : (
                    <AiFillEye className="icon" />
                  )}
                </span>
              </div>

              <div className="input-container">
                <RiLockPasswordFill className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name={'confirmPassword'}
                  id={'confirmPassword'}
                  value={confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="input-field"
                />
                <label htmlFor={'confirmPassword'} className="input-label">
                  Confirm Password
                </label>
                <span className="input-highlight"></span>
                <span
                  onClick={displayConfirmPassword}
                  className="password-display"
                >
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible className="icon" />
                  ) : (
                    <AiFillEye className="icon" />
                  )}
                </span>
              </div>
            </div>

            <div className="consent-and-others-container">
              <div className="consent-terms-button-login-container">
                <div className="register-consent">
                  <input
                    type="checkbox"
                    name="agree"
                    className="register-consent-input"
                  />
                  <span className="accept">I accept</span>
                  <NavLink className={'terms-of-user'}> Terms of Use</NavLink>
                </div>

                <button className="register-button">
                  {loading && <ButtonSpinner />}
                  {loading && <span>Loading...</span>}
                  {!loading && <span>Register</span>}
                </button>
                <p className="haveAccount">
                  Already have an account?
                  <NavLink to="/login"> Log In </NavLink>
                </p>
              </div>

              <div className="password-preconditions">
                <aside className="password-checkbox">
                  <h3>Checking Password Confirmation</h3>
                  <p className="text">
                    {switchIcon(letterCase)} &nbsp; Lowercase & UpperCase
                  </p>

                  <p className="text">
                    {switchIcon(number)} &nbsp; Number (0-9)
                  </p>

                  <p className="text">
                    {switchIcon(specialCharacter)} &nbsp; Spceial Character
                    (!%@#^*?_~)
                  </p>

                  <p className="text">
                    {switchIcon(passwordLength)} &nbsp; Minimum 8 Characters
                  </p>
                </aside>
              </div>
            </div>
          </form>
        </fieldset>
      </section>
    </main>
  );
};

export default Register;
