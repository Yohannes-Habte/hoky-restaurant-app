import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import ReservationDataTable from '../../components/tables/dataGridTables/ReservationDataTable';
import { useState } from 'react';
import axios from 'axios';
import ButtonLoader from '../../components/loader/ButtonLoader';
import HandleData from '../../functions/HandleData';

const ReservationList = () => {
  // Local state variables
  const [open, setOpen] = useState(false);

  // Display reservations in the frontend
  const { data, loading, error } = HandleData(
    'http://localhost:5000/api/reservations'
  );

  // Delete single reservation
  const deleteReservation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="list-page">
      {/* Navbar component */}
      <Navbar />

      <div className="list-container">
        <Sidebar />
        <section className="table-list-container">
          <h1 className="title">Reservation Information</h1>

          {/* List Infos */}
          <article className="add-to-list">
            <h3 className="subTitle"> List of Reservations </h3>
            <button className="add-btn">
              {loading && <ButtonLoader />}
              {loading && <span>Loading...</span>}
              {!loading && <span>Add Reservation</span>}
            </button>
          </article>

          {/* Reservation data table component */}
          <ReservationDataTable />
        </section>
      </div>

      <section className="reservations">
        <h2 className="reservations-title"> Customers Remarks </h2>
        <div className="wrapper">
          {data.map((reservation) => {
            return (
              <article key={reservation._id} className="reservation">
                <h3 className="subTitle">
                  {reservation.firstName} {reservation.lastName}
                </h3>
                <p className="paragraph"> {reservation.message} </p>
                <p className="paragraph">
                  The message is send on{' '}
                  <span className="date">{reservation.date} </span>
                </p>

                <p className="paragraph">
                  Email feedback to the customer using{' '}
                  <strong className="email">{reservation.email}</strong>
                </p>

                {/* Close comment */}
                <span
                  onClick={() => deleteReservation(reservation._id)}
                  className="close"
                >
                  X
                </span>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default ReservationList;
