import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <div>
      <p>VLG Icon</p>
      <ul>
        <NavLink to="/dashboard">Home</NavLink>
        <NavLink to="/nintendo">Nintendo</NavLink>
        <NavLink to="/playstation">PlayStation</NavLink>
        <NavLink to="/xbox">Xbox</NavLink>
        <NavLink to="/pc">PC</NavLink>
        <NavLink to="/list">My List</NavLink>
      </ul>
    </div>
    <form>
      <input type="text" placeholder="title"></input>
      <button>magnifying icon</button>
    </form>
    <div>
      <p>user profile pic</p>
      <p>arrown down icon</p>
    </div>
  </nav>
);

export default NavBar;
