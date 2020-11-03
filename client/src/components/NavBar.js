import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Account from './Account';
import IconSearch from '../svgs/IconSearch';

const NavBar = (props) => (
  <nav className="navbar">
    <div className="navbar__container navbar__container--one">
      <p className="navbar__logo">VLG Icon</p>
      <ul className="navbar__links">
        <li>
          <NavLink to="/" className="navbar__link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/nintendo" className="navbar__link">
            Nintendo
          </NavLink>
        </li>
        <li>
          <NavLink to="/playstation" className="navbar__link">
            PlayStation
          </NavLink>
        </li>
        <li>
          <NavLink to="/xbox" className="navbar__link">
            Xbox
          </NavLink>
        </li>
        <li>
          <NavLink to="/pc" className="navbar__link">
            PC
          </NavLink>
        </li>
        <li>
          <NavLink to="/list" className="navbar__link">
            My List
          </NavLink>
        </li>
      </ul>
    </div>
    <div className="navbar__container navbar__container--two">
      <NavLink to="/search" className="navbar__search-link">
        <IconSearch />
      </NavLink>
      <div className="navbar__profile-photo-container">
        <img
          src={props.user.profilePhoto}
          alt="profile photo"
          className="navbar__profile-photo"
        ></img>
        <ion-icon name="caret-down"></ion-icon>
        <Account />
      </div>
    </div>
  </nav>
);

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(NavBar);
