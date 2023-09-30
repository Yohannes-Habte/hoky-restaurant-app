import React from 'react';
import './SectionHeader.scss';

const SectionHeader = ({ heading, button }) => {
  return (
    <React.Fragment >
      <section className="section-header">
        <h1 className="title"> {heading} </h1>
        <button className="button"> {button} </button>
      </section>
      <div className="horizontal-line"> </div>
    </React.Fragment>
  );
};

export default SectionHeader;
