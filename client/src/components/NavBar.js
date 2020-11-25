import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Account from './Account';
import IconMenu from '../svgs/IconMenu';
import IconSearch from '../svgs/IconSearch';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.accountRef = React.createRef();
    this.accountLinksRef = React.createRef();
    this.state = {
      accountActive: false,
      menuActive: false,
    };
  }

  handleToggleAccount = () => {
    this.setState((prevState) => ({ accountActive: !prevState.accountActive }));
  };

  handleCloseAccount = (e) => {
    if (this.accountRef && !this.accountRef.current.contains(e.target)) {
      this.setState(() => ({
        accountActive: false,
      }));
    }
  };

  handleOpenMenu = () => {
    this.setState((prevState) => ({ menuActive: !prevState.menuActive }));
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleCloseAccount);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleCloseAccount);
  }

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
              <NavLink
                to="/"
                className="navbar__link"
                activeClassName="navbar__active-link"
                exact={true}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/nintendo"
                className="navbar__link"
                activeClassName="navbar__active-link"
              >
                Nintendo
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/playstation"
                className="navbar__link"
                activeClassName="navbar__active-link"
              >
                PlayStation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/xbox"
                className="navbar__link"
                activeClassName="navbar__active-link"
              >
                Xbox
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pc"
                className="navbar__link"
                activeClassName="navbar__active-link"
              >
                PC
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/list"
                className="navbar__link"
                activeClassName="navbar__active-link"
              >
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
            onClick={this.handleToggleAccount}
            ref={this.accountRef}
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
