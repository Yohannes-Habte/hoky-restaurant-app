import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './List.scss';
import ButtonLoader from '../../components/loader/ButtonLoader';
import OrdersDataTable from '../../components/tables/OrdersDataTable';

const OrderList = () => {
  // Local state variables
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  return (
    <main className="list-page">
      {/* Navbar component */}
      <Navbar />

      <div className="list-container">
        <Sidebar />
        <section className="table-list-container">
          <h1 className="title">Order Information</h1>

          {/* List Infos */}
          <article className="add-to-list">
            <h3 className="subTitle"> List of Orders </h3>
            <button className="add-btn">
              {loading && <ButtonLoader />}
              {loading && <span>Loading...</span>}
              {!loading && <span>Add Order</span>}
            </button>
          </article>

          {/* Order data table component */}
          <OrdersDataTable />
        </section>
      </div>
    </main>
  );
};

export default OrderList;
