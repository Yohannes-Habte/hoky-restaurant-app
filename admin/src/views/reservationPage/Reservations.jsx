import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import ReservationDataTable from '../../components/tables/dataGridTables/ReservationDataTable';

const Reservations = () => {
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
            <button className="add-btn">Add Reservation</button>
          </article>

          {/* Reservation data table component */}
          <ReservationDataTable />
        </section>
      </div>
    </main>
  );
};

export default Reservations;
