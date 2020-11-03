import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import IconClose from '../svgs/IconClose';
import IconPlayBtn from '../svgs/IconPlayBtn';
import { hideModal } from '../actions/modal';

Modal.setAppElement('#root');

class PlayOptionsModal extends Component {
  handleCloseModal = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.modals.includes('playOptionsModal')}
        onRequestClose={this.handleCloseModal}
        className="play-modal"
      >
        <div className="play-modal__close-icon-container">
          <div onClick={this.handleCloseModal}>
            <IconClose />
          </div>
        </div>
        <h4>Play Options</h4>
        {this.props.currentGame.videos === undefined ? (
          <p>Unavailable Videos</p>
        ) : (
          this.props.currentGame.videos.map(({ id, name, video_id }) => (
            <Link to={`/watch/${video_id}`} key={id}>
              <p>{name}</p>
            </Link>
          ))
        )}
        <button className="btn play-modal__btn">
          <span className="play-modal__btn-text">Play</span>
          <IconPlayBtn onClick={this.handleCloseModal} />
        </button>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  currentGame: state.game.currentGame,
  modals: state.modals,
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal('playOptionsModal')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayOptionsModal);
