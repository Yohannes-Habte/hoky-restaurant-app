import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import UserDataTable from '../../components/tables/dataGridTables/UserDataTable';
import './List.scss';
import NewUser from '../../components/addNew/NewUser';

const UsersList = () => {
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
              Add User
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
