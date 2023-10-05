import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './Comments.scss';
import axios from 'axios';
import PageLoader from '../../components/loader/PageLoader';
import HandleData from '../../functions/HandleData';
import { toast } from 'react-toastify';
import ErrorMessage from '../../components/messages/ErrorMessage';

const Comments = () => {
  // Global state variables for fetching commments
  const { data, loading, error } = HandleData(
    'http://localhost:5000/api/comments'
  );

  // Global state variables for deleting commments

  // Delete single comment
  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`, {
        withCredentials: true,
      });
    } catch (err) {
      toast.error(ErrorMessage(err));
    }
  };

  return (
    <main className="comment-page">
      {/* Navbar component */}
      <Navbar />

      <div className="comment-container">
        <Sidebar />
        <section className="comments">
          <h1 className="title">Customers Comments</h1>

          {/* Specific comment */}
          {loading ? (
            <PageLoader />
          ) : error ? (
            error
          ) : (
            <div className="wrapper">
              {data.map((comment) => {
                return (
                  <article className="comment">
                    <h3 className="subTitle">
                      {comment.firstName} {comment.lastName}
                    </h3>

                    <p className="paragraph">
                      {comment.message}{' '}
                      <span className="createdAt">
                        The message is sent on{' '}
                        <strong className="date">{comment.createdAt}</strong>
                      </span>
                    </p>

                    <p className="paragraph">
                     You can send email to{' '}
                      <strong className="email">{comment.email}</strong>
                    </p>

                    {/* Close comment */}
                    <span
                      onClick={() => deleteComment(comment._id)}
                      className="close"
                    >
                      X
                    </span>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Comments;
