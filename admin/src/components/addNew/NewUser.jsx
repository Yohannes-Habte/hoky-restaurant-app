import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import './AddNew.scss';

const NewUser = ({ setOpen }) => {
  // State variables
  const [image, setImage] = useState('');
  const [inputs, setInputs] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
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

  return (
    <div className="add">
      <section className="modal">
        <span onClick={() => setOpen(false)} className="close">
          X
        </span>
        <h3 className="title"> Add New User </h3>

        {/* Image Form */}
        <form action="" className="form">
          {/* Image input */}
          <div className="file-input-container">
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])} // upload only one image
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
      </section>
    </div>
  );
};

export default NewUser;
