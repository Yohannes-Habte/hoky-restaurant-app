import React, { useContext, useState } from 'react';
import './Profile.scss';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { UserCartContext } from '../../context/userCart/UserCartProvider';
import { FaUpload, FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import PageMenu from '../../compenents/pageMenu/PageMenu';
import axios from 'axios';
import { USER_CART_ACTION } from '../../context/userCart/UserCartReducer';
import { toast } from 'react-toastify';
import { cloud_URL, cloud_name, upload_preset } from '../../utiles/Utiles';

const Profile = () => {
  const navigate = useNavigate();

  // Global state variables
  const { dispatch, user } = useContext(UserCartContext);

  // Initial State
  const initialSate = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    password: user?.password || '',
    role: user?.role || '',
    image: user?.image || '',
  };

  // Local state variables
  const [formData, setFormData] = useState(initialSate);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Input change handle function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // Save updated image in the database
  const saveImage = async (event) => {
    event.preventDefault();

    let imageURL;
    try {
      if (
        profileImage !== null &&
        (profileImage.type === 'image/jpeg' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/png')
      ) {
        const userImage = new FormData();
        userImage.append('file', profileImage);
        userImage.append('cloud_name', cloud_name);
        userImage.append('upload_preset', upload_preset);

        // Save image to cloudinary
        const response = await fetch(cloud_URL, {
          method: 'POST',
          body: userImage,
        });
        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }

      // Save image to mongoDB
      const photo = {
        image: profileImage ? imageURL : formData.image,
      };
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/api/users/:id/update-photo',
        photo,
        { withCredentials: true }
      );

      dispatch({ type: USER_CART_ACTION.UPDATE_USER_DATA, payload: data });
      localStorage.setItem('user', JSON.stringify(data));

      // Reset
      setImagePreview(null);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Submit updated profile
  const submitUpdatedPfrofile = async (event) => {
    event.preventDefault();

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/api/users/:id',
        userData,
        { withCredentials: true }
      );

      dispatch({ type: USER_CART_ACTION.UPDATE_USER_DATA, payload: data });
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="profile-page">
      <Helmet>
        <title>About Page </title>
      </Helmet>

      <PageMenu />
      <section className="profile-container">
        <figure className="photo-container">
          <img
            className="photo"
            src={imagePreview === null ? user?.image : imagePreview}
            alt="Profile"
          />

          {imagePreview !== null && (
            <button onClick={saveImage} className="update-image-btn">
              <FaUpload className="icon" size={18} /> Upload Image
            </button>
          )}

          <h3 className="role">Role: {user.role} </h3>
        </figure>
        <form
          onSubmit={submitUpdatedPfrofile}
          action=""
          className="profile-form"
        >
          <div className="input-container">
            <FaUserAlt className="input-icon" />
            <input
              type="file"
              accept="image/*" // accept any type of image
              name={'image'}
              id="image"
              onChange={handleImageChange}
              className="input-field"
            />

            <label htmlFor={'image'} className="input-label">
              User Image
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <FaUserAlt className="input-icon" />
            <input
              type="text"
              required
              name={'firstName'}
              id={'firstName'}
              value={formData?.firstName}
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
              value={formData?.lastName}
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
              value={formData?.email}
              onChange={handleInputChange}
              placeholder="Email"
              disabled
              className="input-field"
            />
            <label htmlFor={'email'} className="input-label">
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
              value={formData?.password}
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

          <button className="update-button"> Update </button>
        </form>
      </section>
    </main>
  );
};

export default Profile;
