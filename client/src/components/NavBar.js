import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Account from './Account';
import IconMenu from '../svgs/IconMenu';
import IconSearch from '../svgs/IconSearch';

class NavBar extends Component {
  state = {
    accountActive: false,
    menuActive: false,
  };

  handleOpenAccount = () => {
    this.setState((prevState) => ({ accountActive: !prevState.accountActive }));
  };

  handleOpenMenu = () => {
    this.setState((prevState) => ({ menuActive: !prevState.menuActive }));
  };

  render() {
    const account = classNames('navbar__container-one', {
      'navbar__container-one--active': this.state.menuActive,
    });
    const menu = classNames('navbar__menu-icon-container', {
      'navbar__menu-icon-container--active': this.state.menuActive,
    });

    return (
      <nav className="navbar">
        <div className="navbar__logo-container">
          <p className="navbar__logo">VLG</p>
        </div>
        <div className={account}>
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
        <div className="navbar__container-two">
          <div className="navbar__search-link-container">
            <NavLink to="/search" className="navbar__search-link">
              <IconSearch />
            </NavLink>
          </div>
          <div
            className="navbar__profile-photo-container"
            onClick={this.handleOpenAccount}
          >
            <img
              src={this.props.user.profilePhoto}
              alt="profile photo"
              className="navbar__profile-photo"
            ></img>
            {this.state.accountActive && <Account />}
          </div>
          <div className={menu} onClick={this.handleOpenMenu}>
            <IconMenu menuActive={this.state.menuActive} />
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(NavBar);
