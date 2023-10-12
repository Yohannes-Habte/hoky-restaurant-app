import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import RevenueChart from '../../components/charts/areaChart/RevenueChart';
import './Home.scss';
import SalesLinechart from '../../components/charts/lineChart/SalesLinechart';
import RevenueBarChart from '../../components/charts/barChart/RevenueBarChart';

const Home = () => {
  // Get gear
  const date = new Date();
  const year = date.getFullYear();

  return (
    <main className="home-page">
      <Navbar />

      <article className="home-container">
        <Sidebar />

        <div className="sections-container">
          {/* Annual Revenue  */}
          <section className="section">
            <h3 className="subTitle">Annual Revenue for {year} </h3>
            <RevenueChart />
          </section>

          {/* Annual Revenue  */}
          <section className="section">
            <h3 className="subTitle">Annual Revenue for {year} </h3>
            <RevenueBarChart />
          </section>

          {/* Annual Revenue  */}
          <section className="section">
            <h3 className="subTitle">Annual Revenue for {year} </h3>
            <SalesLinechart />
          </section>
        </div>
      </article>
    </main>
  );
};

export default Home;
