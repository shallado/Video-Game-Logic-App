import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <p>VLG Logo</p>
    <button>Sign In</button>
    <h1>Video Game Logic</h1>
    <p>Your one stop shop for video game info old, new, and upcoming</p>
    <Link to={'/signup'}>
      <button>Sign Up</button>
    </Link>
  </div>
);

export default HomePage;
