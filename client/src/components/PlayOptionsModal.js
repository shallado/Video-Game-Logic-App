import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

class PlayOptionsModal extends Component {
  state = {
    modalIsOpen: false,
  };

  handleOpenModal = () => {
    this.setState(() => ({ modalIsOpen: true }));
  };

  handleCloseModal = () => {
    this.setState(() => ({ modalIsOpen: false }));
  };

  render() {
    return (
      <div>
        <div>
          <ion-icon
            name="caret-forward-circle"
            onClick={this.handleOpenModal}
          ></ion-icon>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleCloseModal}
        >
          <h4>Play Options</h4>
          {this.props.currentGame.videos === 'undefined' ? (
            <p>Unavailable Videos</p>
          ) : (
            this.props.currentGame.videos.map(({ id, name, video_id }) => (
              <Link to={`/watch/${video_id}`} key={id}>
                <p>{name}</p>
              </Link>
            ))
          )}
          <ion-icon name="close" onClick={this.handleCloseModal}></ion-icon>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentGame: state.game.currentGame,
});

export default connect(mapStateToProps)(PlayOptionsModal);
