import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import MenuDataTable from '../../components/tables/dataGridTables/MenuDataTable';
import './List.scss';

const MenuList = () => {
  return (
    <main className="list-page">
      {/* Navbar component */}
      <Navbar />

      <div className="list-container">
        <Sidebar />
        <section className="table-list-container">
          <h1 className="title">Menu Information</h1>

          {/* List Infos */}
          <article className="add-to-list">
            <h3 className="subTitle"> List of Menu </h3>
            <button className="add-btn">Add Menu</button>
          </article>

          {/* Menu data table component */}
          <MenuDataTable />
        </section>
      </div>
    </main>
  );
};

export default MenuList;
