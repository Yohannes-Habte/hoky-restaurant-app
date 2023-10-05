import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import AddDrink from '../../components/addNew/AddDrink';
import ButtonLoader from '../../components/loader/ButtonLoader';
import DrinksDataTable from '../../components/tables/DrinksDataTable';

const DrinksList = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <main className="list-page">
      {/* Navbar component */}
      <Navbar />

      <div className="list-container">
        <Sidebar />
        <section className="table-list-container">
          <h1 className="title">Drinks Information</h1>

          {/* List Infos */}
          <article className="add-to-list">
            <h3 className="subTitle"> List of Drinks </h3>

            <button onClick={() => setOpen(true)} className="add-btn">
              {loading && <ButtonLoader />}
              {loading && <span>Loading...</span>}
              {!loading && <span>Add Drink</span>}
            </button>
          </article>

          {/* Meals data table component */}
          <DrinksDataTable />
        </section>
      </div>
      {open && <AddDrink setOpen={setOpen} />}
    </main>
  );
};

export default DrinksList;
