import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './List.scss';
import NewUser from '../../components/addNew/NewUser';
import HandleData from '../../functions/HandleData';
import ButtonLoader from '../../components/loader/ButtonLoader';
import UserDataTable from '../../components/tables/UserDataTable';

const UsersList = () => {
  // Display reservations in the frontend
  const { data, loading, error } = HandleData(
    'http://localhost:5000/api/users'
  );
  // Local state variable
  const [open, setOpen] = useState(false);

  return (
    <main className="list-page">
      {/* Navbar component */}
      <Navbar />

      <div className="list-container">
        <Sidebar />
        <section className="table-list-container">
          <h1 className="title">Users Information</h1>

          {/* List Infos */}
          <article className="add-to-list">
            <h3 className="subTitle"> List of Users </h3>
            <button onClick={() => setOpen(true)} className="add-btn">
              {loading && <ButtonLoader />}
              {loading && <span>Loading...</span>}
              {!loading && <span>Add Reservation</span>}
            </button>
          </article>

          {/* User data table component */}
          {<UserDataTable />}
        </section>
      </div>

      {open && <NewUser setOpen={setOpen} />}
    </main>
  );
};

export default UsersList;
