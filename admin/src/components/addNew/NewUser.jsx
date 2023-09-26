import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import './AddNew.scss';

const NewUser = ({ setOpen }) => {
  // State variables
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // UseEffect to display user inputs
  useEffect(() => {
    const fetchInputs = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/forms/user-inputs'
        );
        setInputs(data);
      } catch (error) {}
    };
    fetchInputs();
  }, []);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Image validation
      const userPhoto = new FormData();
      userPhoto.append('file', image);
      userPhoto.append('cloud_name', 'dzlsa51a9');
      userPhoto.append('upload_preset', 'upload');

      // Save image to cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dzlsa51a9/image/upload`,
        userPhoto
      );
      const { url } = response.data;

      // New user body
      const newUser = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
        image: url,
      };

      // Post new user to backend
      const { data } = await axios.post(
        'http://localhost:5000/api/users/register',
        newUser,
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <section className="modal">
        <span onClick={() => setOpen(false)} className="close">
          X
        </span>
        <h3 className="title"> Add New User </h3>

        <section className="imagePreview-form-container">
          {/* User Form */}
          <form onSubmit={handleSubmit} action="" className="form">
            {/* Image input */}
            <div className="file-input-container">
              <input
                type="file"
                accept="image/*"
                name="image"
                id="image"
                onChange={handleImageChange}
                className="file-field"
              />

              <label htmlFor="image" className="file-label">
                Image: <FaCloudUploadAlt className="icon" />
              </label>
            </div>

            {/* Additional user inputs */}
            {inputs.map((input) => {
              return (
                <div key={input._id} className="input-container">
                  <input
                    type={input.type}
                    name={input.name}
                    id={input.id}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    className="input-field"
                  />
                  <span className="input-highlight"></span>
                </div>
              );
            })}

            <button className="add-btn">Send</button>
          </form>

          {/* Image priview */}
          <figure className="photo-container">
            <img
              className="image"
              src={
                imagePreview
                  ? imagePreview
                  : 'https://icon-library.com/images/no-image-icon//no-image-icon-0.jpg'
              }
              alt=""
            />
          </figure>
        </section>
      </section>
    </div>
  );
};

export default NewUser;
