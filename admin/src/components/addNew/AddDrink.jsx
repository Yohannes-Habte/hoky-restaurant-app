import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import './AddNew.scss';
import HandleData from '../../functions/HandleData';
import PageLoader from '../loader/PageLoader';
import { toast } from 'react-toastify';
import ErrorMessage from '../messages/ErrorMessage';
import ButtonLoader from '../loader/ButtonLoader';

const AddDrink = ({ setOpen }) => {
  // Local State Variables
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [drinkInfo, setDrinkInfo] = useState({});

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrinkInfo({ ...drinkInfo, [name]: value });
  };

  // Display drink inputs using useEffect Global Function
  const { data, loading, error } = HandleData(
    'http://localhost:5000/api/forms/drink-inputs'
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
        const drinkImage = new FormData();
        drinkImage.append('file', image);
        drinkImage.append('cloud_name', 'dzlsa51a9');
        drinkImage.append('upload_preset', 'upload');

        // Save image to cloudinary
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dzlsa51a9/image/upload`,
          drinkImage
        );
        const { url } = response.data;
        console.log(response);

        // New Meal body
        const newDrink = {
          name: drinkInfo.name,
          price: drinkInfo.price,
          image: url,
          quantity: drinkInfo.quantity,
          category: drinkInfo.category,
          brand: drinkInfo.brand,
          description: drinkInfo.description,
          featured: drinkInfo.featured,
        };

        // Post new drink to the backend
        const { data } = await axios.post(
          'http://localhost:5000/api/drinks/new-drink',
          newDrink,
          { withCredentials: true }
        );

        // Reset
        e.target.reset();

        toast.success('Drink is successfully create!');
      } else {
        throw new Error('Image is not valid! Please try again!');
      }
    } catch (err) {
      console.log(error);
      toast.error(ErrorMessage(err));
    }
  };

  return (
    <div className="add">
      <section className="modal">
        <span onClick={() => setOpen(false)} className="close">
          X
        </span>
        <h3 className="title"> Add Drink </h3>
        <section className="imagePreview-form-container">
          {/* Drink Form */}
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

            {/* Additional drink inputs */}
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
              alt="Drink"
            />
          </figure>
        </section>
      </section>
    </div>
  );
};

export default AddDrink;
