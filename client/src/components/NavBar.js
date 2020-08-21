import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AccountModal from './AccountModal';

class NavBar extends Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState(() => ({ modalIsOpen: true }));
  };

  closeModal = () => {
    this.setState(() => ({ modalIsOpen: false }));
  };

  render() {
    return (
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
        <div onMouseEnter={this.openModal} onMouseLeave={this.closeModal}>
          <img
            src="/img/default-profile-photo.jpeg"
            alt="default profile photo"
            height="24"
            width="24"
          ></img>
          <ion-icon name="caret-down"></ion-icon>
          <AccountModal
            modalIsOpen={this.state.modalIsOpen}
            closeModal={this.closeModal}
          />
        </div>
      </nav>
    );
  }
}

export default NavBar;
