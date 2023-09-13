import React, { useState } from 'react';
import './Contact.scss';
import { Helmet } from 'react-helmet-async';
import { FiPhoneCall } from 'react-icons/fi';
import { MdClose, MdEmail, MdLocationOn } from 'react-icons/md';
import { FaCloudUploadAlt, FaTwitterSquare, FaUserAlt } from 'react-icons/fa';
import { BiSolidMessageDetail } from 'react-icons/bi';
import './Contact.scss';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cloud_URL, cloud_name, upload_preset } from '../../utiles/Utiles';
import Fetch from '../../globalFunction/GlobalFunction';

// Initial State
const initialSate = {
  firstName: '',
  lastName: '',
  email: '',
  image: '',
  message: '',
};

const Contact = () => {
  // Comment Id
  const params = useLocation();
  console.log('Comment Id will be', params);
  // Local State variables
  const [testimonies, setTestimonies] = useState(initialSate);
  const [testimonyImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Distructure the initial values
  const { firstName, lastName, email, image, message } = testimonies;

  // Function that handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTestimonies({ ...testimonies, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveImage = async (event) => {
    event.preventDefault();

    let imageURL;
    try {
      if (
        testimonyImage !== null &&
        (testimonyImage.type === 'image/jpeg' ||
          testimonyImage.type === 'image/jpg' ||
          testimonyImage.type === 'image/png')
      ) {
        const userImage = new FormData();
        userImage.append('file', testimonyImage);
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
        image: testimonyImage ? imageURL : testimonies.image,
      };
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/api/comments',
        photo,
        { withCredentials: true }
      );

      localStorage.setItem('user', JSON.stringify(data));

      // Reset
      setImagePreview(null);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Display comment in the frontend using the global function (useEffect)
  // Global variables and function
  const { data, loading, error } = Fetch('/api/comments');

  // Function to submit user testimonial or comment
  // Global state variables and functions
  const { postData } = Fetch('/api/comments/new-comment');
  const submitTestimonial = async (event) => {
    event.preventDefault();

    try {
      // new comment
      const newComment = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message,
      };

      postData(newComment);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Delete single comment
  const deleteComment = async (id) => {
    try {
      await axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/api/comments/${id}`
      );
      // setComments(comments.filter((comment) => comment._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="contact-page">
      <Helmet>
        <title>Contact </title>
      </Helmet>

      <section className="contact-container">
        <h1 className="contact-title">We Would Love to Hear From You</h1>
        <div className="form-communication-tools">
          <article className="form-container">
            <h3 className="sub-title"> Drop us a message below </h3>

            <form
              onSubmit={submitTestimonial}
              encType="multipart/form-data"
              className="contact-form"
            >
              <div className="user-data">
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

                <div className="input-container file-container">
                  <FaUserAlt className="input-icon" />
                  <input
                    type="file"
                    accept="image/*" // accept any type of image
                    name={'image'}
                    id="image"
                    onChange={handleImageChange}
                    className="input-field"
                  />

                  <button className="file-cover">
                    <FaCloudUploadAlt size={18} />
                  </button>

                  <label htmlFor={'image'} className="input-label">
                    Testimonial Image
                  </label>
                  <span className="input-highlight"></span>
                </div>
              </div>

              <div className="text-message-container">
                <BiSolidMessageDetail className="input-icon" />
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={handleInputChange}
                  rows="7"
                  placeholder="We value your message"
                  className="text-area-input-field"
                />

                <label htmlFor={'message'} className="input-label">
                  Text Message
                </label>
                <span className="input-highlight"></span>
              </div>
              <button className="contact-form-btn">Submit</button>
            </form>
          </article>

          <article className="fast-contact-tools">
            <h5 className="sub-title"> Would you like a prompt reply? </h5>
            <div className="contact-tools">
              <FiPhoneCall className="contact-icon" />
              <p className="link-container">
                <a className="link" href="tel:+4917581005650">
                  Call us
                </a>
              </p>
            </div>
            <div className="contact-tools">
              <MdEmail className="contact-icon" />
              <p className="link-container">
                <a className="link" href="mailto:uelandrae@gmail.com">
                  Email Us
                </a>
              </p>
            </div>
            <div className="contact-tools">
              <FaTwitterSquare className="contact-icon" />
              <p className="link-container">
                <a className="link" href="twitter">
                  Tweet us
                </a>
              </p>
            </div>
            <div className="contact-tools">
              <MdLocationOn className="contact-icon" />
              <p className="link-container">
                <a className="link" href="#">
                  {' '}
                  Straße 31, 4657 Hamburg, Germany
                </a>
              </p>
            </div>
            <figure className="image-display">
              <img
                src={
                  imagePreview
                    ? imagePreview
                    : 'https://icon-library.com/images/no-image-icon//no-image-icon-0.jpg'
                }
                alt="Testimanial"
                className="image"
              />
            </figure>
          </article>
        </div>
      </section>

      {/* Open public comments */}
      <section className="public-comments">
        <h2 className="comment-title"> Public Comments</h2>

        <div className="comments">
          {data.map((comment) => {
            return (
              <article key={comment._id} className="single-comment">
                <div className="photo-container">
                  <img src={comment.file} alt={comment.nam} className="photo" />
                </div>
                <div className="name-email">
                  <span className="name">
                    {comment.firstName} {comment.lastName}
                  </span>
                  <span className="email">
                    <a href={`mailto:${comment.email}`}> Send Email </a>
                  </span>
                </div>
                <p className="message"> {comment.message} </p>

                <MdClose
                  onClick={() => deleteComment(comment._id)}
                  className="close-icon"
                />
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Contact;
