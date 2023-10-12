import axios from 'axios';
import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import HandleData from '../../functions/HandleData';
import PageLoader from '../loader/PageLoader';
import { toast } from 'react-toastify';
import ButtonLoader from '../loader/ButtonLoader';

const AddMeal = ({ setOpen }) => {
  // Local State Variables
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [mealInfo, setMealInfo] = useState({});

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealInfo({ ...mealInfo, [name]: value });
  };

  // Display meal inputs using useEffect Global Function
  const { data, loading, error } = HandleData(
    'http://localhost:5000/api/forms/meal-inputs'
  );

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Meal image validation
      if (
        image !== null &&
        (image.type === 'image/jpeg' ||
          image.type === 'image/jpg' ||
          image.type === 'image/png')
      ) {
        const mealImage = new FormData();
        mealImage.append('file', image);
        mealImage.append('cloud_name', 'dzlsa51a9');
        mealImage.append('upload_preset', 'upload');

        // Save image to cloudinary
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dzlsa51a9/image/upload`,
          mealImage
        );
        const { url } = response.data;

        // New Meal body
        const newMeal = {
          name: mealInfo.name,
          price: mealInfo.price,
          discountedPrice: mealInfo.discountedPrice,
          category: mealInfo.category,
          description: mealInfo.description,
          quantity: mealInfo.quantity,
          featured: mealInfo.featured,
          image: url,
        };

        // Post new Meal to the backend
        const { data } = await axios.post(
          'http://localhost:5000/api/meals/new-meal',
          newMeal,
          { withCredentials: true }
        );

        // Reset
        e.target.reset();

        toast.success('Meal is successfully create!');
      } else {
        throw new Error('Image is not valid! Please try again!');
      }
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
        <h3 className="title"> Add New Meal </h3>
        <section className="imagePreview-form-container">
          {/* Meal Form */}
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
            {loading ? (
              <PageLoader />
            ) : error ? (
              error
            ) : (
              data.map((input) => {
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
              })
            )}

            <button className="add-btn">
              {loading && <ButtonLoader />}
              {loading && <span>Loading...</span>}
              {!loading && <span>Send</span>}
            </button>
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
              alt="Profile"
            />
          </figure>
        </section>
      </section>
    </div>
  );
};

export default AddMeal;
