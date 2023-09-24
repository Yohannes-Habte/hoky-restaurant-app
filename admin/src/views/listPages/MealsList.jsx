import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './List.scss';
import MealsDataTable from '../../components/tables/dataGridTables/MealsDataTable';
import AddMeal from '../../components/addNew/AddMeal';

const MealsList = () => {
  const [open, setOpen] = useState(false);
  return (
    <main className="list-page">
      {/* Navbar component */}
      <Navbar />

      <div className="list-container">
        <Sidebar />
        <section className="table-list-container">
          <h1 className="title">Meals Information</h1>

          {/* List Infos */}
          <article className="add-to-list">
            <h3 className="subTitle"> List of Meals </h3>
            <button onClick={() => setOpen(true)} className="add-btn">
              Add Meal
            </button>
          </article>

          {/* Meals data table component */}
          <MealsDataTable />
        </section>
      </div>
      {open && <AddMeal setOpen={setOpen} />}
    </main>
  );
};

export default MealsList;
