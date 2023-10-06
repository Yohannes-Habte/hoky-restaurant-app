import React from 'react';
import { serviceInfo } from '../../data/Data';
import "./HomeInfoBox.scss"

const HomeInfoBox = () => {
  return (
    <div className="info-boxes">
      {serviceInfo.map((item, index) => {
        const { icon, heading, text } = item;
        return (
          <div key={index} className="info-box">
            <div className="icon"> {icon} </div>
            <article className="text">
              <h4> {heading} </h4> <p> {text} </p>{' '}
            </article>
          </div>
        );
      })}
    </div>
  );
};

export default HomeInfoBox;
