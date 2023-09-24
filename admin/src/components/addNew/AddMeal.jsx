import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const AddMeal = ({ setOpen }) => {
  // Local State Variables
  const [image, setImage] = useState(null);
  const [imagePreview, setMealPreview] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [mealInfo, setMealInfo] = useState({});

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setMealPreview(URL.createObjectURL(e.target.files[0]));
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealInfo({ ...mealInfo, [name]: value });
  };

  // UseEffect to display meal inputs
  useEffect(() => {
    const fetchInputs = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/forms/meal-inputs'
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
        console.log(response);

        // New Meal
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
        <h3 className="title"> Add New User </h3>
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
              alt="Profile"
            />
          </figure>
        </section>
      </section>
    </div>
  );
};

export default AddMeal;
