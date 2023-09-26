import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './Comments.scss';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Comments = () => {
  // Local state variable
  const [data, setData] = useState([]);

  // Display comments in the frontend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/comments`);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Delete single comment
  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`);
    } catch (error) {
      console.log(error);
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
                    Please email me to{' '}
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
        </section>
      </div>
    </main>
  );
};

export default Comments;
