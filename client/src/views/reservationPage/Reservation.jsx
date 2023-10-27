import React, { useContext, useState } from 'react';
import { FaUsers, FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsCalendarDateFill, BsFileTextFill } from 'react-icons/bs';
import { GiTimeBomb } from 'react-icons/gi';
import axios from 'axios';
import './Reservation.scss';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utiles/Utiles';
import { reservationContext } from '../../context/reservation/ReservationProvider';
import { RESERVATION_ACTION } from '../../context/reservation/ReservationReducer';

// Initial State
const initialSate = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  persons: '',
  message: '',
};
const Reservation = () => {
  // Global state variables
  const { dispatch, error, loading } =
    useContext(reservationContext);
  // Local state variables
  const [reservationData, setFormData] = useState(initialSate);

  // Distructure form data
  const { firstName, lastName, email, phone, date, time, persons, message } =
    reservationData;

  // Input change handle function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...reservationData, [name]: value });
  };

  // Submit reservation
  const SubmitReservation = async (event) => {
    event.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !date ||
      !time ||
      !persons ||
      !message
    ) {
      return toast.error('Please fill in all fields!');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email!');
    }
    dispatch({ type: RESERVATION_ACTION.RESERVE_START });
    try {
      const newReservation = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        date: date,
        time: time,
        persons: persons,
        message: message,
      };

      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/api/reservations/new',
        newReservation,
        { withCredentials: true }
      );

      dispatch({ type: RESERVATION_ACTION.RESERVE_SUCCESS, payload: data });
      localStorage.setItem('reservation', JSON.stringify(data));

      event.target.reset();
    } catch (err) {
      dispatch({ type: RESERVATION_ACTION.RESERVE_FAIL, payload: error });
      console.log(err);
    }
  };

  return (
    <main className="reservation-page">
      <section className="reservation-container">
        <h1 className="reservation-title">Reservation</h1>
        <p className="paragraph">
          Please reserve exclusively using the form below and confirm your table
          reservation two days before the appointment.
        </p>

        <form onSubmit={SubmitReservation} action="" className="reservation-form">
          <div className="input-containers">
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
                type="text"
                name={'phone'}
                id={'phone'}
                value={phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="input-field"
              />
              <label htmlFor="phone" className="input-label">
                Phone Number
              </label>
              <span className="input-highlight"></span>
            </div>

            <div className="input-container">
              <BsCalendarDateFill className="input-icon" />
              <input
                type="text"
                name={'date'}
                id={'date'}
                value={date}
                onChange={handleInputChange}
                placeholder="date"
                className="input-field"
              />
              <label htmlFor="date" className="input-label">
                Date
              </label>
              <span className="input-highlight"></span>
            </div>

            <div className="input-container">
              <GiTimeBomb className="input-icon" />
              <input
                type="text"
                name={'time'}
                id={'time'}
                value={time}
                onChange={handleInputChange}
                placeholder="Time"
                className="input-field"
              />
              <label htmlFor="time" className="input-label">
                Time
              </label>
              <span className="input-highlight"></span>
            </div>

            <div className="input-container">
              <FaUsers className="input-icon" />
              <input
                type="number"
                name={'persons'}
                id={'persons'}
                value={persons}
                onChange={handleInputChange}
                placeholder="persons"
                className="input-field"
              />
              <label htmlFor="persons" className="input-label">
                Persons
              </label>
              <span className="input-highlight"></span>
            </div>
          </div>

          <div className="textarea-container">
            <BsFileTextFill className="input-icon" />
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              value={message}
              onChange={handleInputChange}
              placeholder="Write remarks here!"
              className="input-field"
            ></textarea>
            <label htmlFor="message" className="input-label">
              Remarks
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="consent">
            <input type="checkbox" name="" id="" className="consent-input" />
            <span className="consent-paragraph">
              By submitting the reservation you accept the following conditions.
              For confirmed reservations that do not show up, we charge a
              cancellation fee of €80.00 per person. If you cancel a group
              reservation (8 people or more) up to one days before the day of
              the event, we will charge a cancellation fee of €80.00 per person.
            </span>
          </div>

          <button className="reservation-btn"> Submit </button>
        </form>
      </section>
    </main>
  );
};

export default Reservation;
