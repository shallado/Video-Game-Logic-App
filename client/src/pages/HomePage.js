import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = (props) => (
  <div className="home-page">
    <div className="home-page__container-one">
      <p className="home-page__logo">VLG Logo</p>
      <Link to="/signin" className="btn-link">
        Sign In
      </Link>
    </div>
    <div className="home-page__container-two">
      <h1 className="heading-one">
        <span className="heading-one__primary">Video Game</span>
        <span className="heading-one__secondary">Logic</span>
      </h1>
      <p className="heading-one__sub-heading">
        Your one stop shop for video game info old, new, and upcoming
      </p>
      <Link to="/signup" className="btn-link btn-link--signup">
        Sign Up
      </Link>
    </div>
  </div>
);

export default HomePage;
