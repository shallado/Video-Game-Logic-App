import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import IconClose from '../svgs/IconClose';
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
        overlayClassName="play-modal__overlay"
      >
        <div className="play-modal__close-icon-container">
          <div onClick={this.handleCloseModal}>
            <IconClose />
          </div>
        </div>
        <div>
          <h5 className="heading-five">Play Options</h5>
          {this.props.currentGame.videos === undefined ? (
            <p>Unavailable Videos</p>
          ) : (
            this.props.currentGame.videos.map(({ id, name, video_id }) => (
              <Link
                to={`/watch/${video_id}`}
                key={id}
                onClick={this.handleCloseModal}
                className="play-modal__play-options"
              >
                <p>{name}</p>
              </Link>
            ))
          )}
        </div>
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
