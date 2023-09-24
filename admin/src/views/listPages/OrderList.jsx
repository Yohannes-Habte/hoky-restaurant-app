import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import OrdersDataTable from '../../components/tables/dataGridTables/OrdersDataTable';
import './List.scss';

const OrderList = () => {
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
            <button className="add-btn">Add Order</button>
          </article>

          {/* Order data table component */}
          <OrdersDataTable />
        </section>
      </div>
    </main>
  );
};

export default OrderList;
