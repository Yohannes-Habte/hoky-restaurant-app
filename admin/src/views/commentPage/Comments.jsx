import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import CommentTable from '../../components/tables/basicTables/CommentTable';

const Comments = () => {
  return (
    <main className="list-page">
      {/* Navbar component */}
      <Navbar />

      <div className="list-container">
        <Sidebar />
        <section className="table-list-container">
          <h1 className="title">Comment Information</h1>

          {/* List Infos */}
          <article className="add-to-list">
            <h3 className="subTitle"> List of Comments </h3>
            <button className="add-btn">Add Comment</button>
          </article>

          {/* Comments data table component */}
          <CommentTable />
        </section>
      </div>
    </main>
  );
};

export default Comments;
