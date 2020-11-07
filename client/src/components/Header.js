import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddRemoveVideoGame from './AddRemoveVideoGame';
import PlayOptionsModal from '../modals/PlayOptionsModal';
import MoreInfoModal from '../modals/MoreInfoModal';
import IconInfoBtn from '../svgs/IconInfoBtn';
import IconPlayBtn from '../svgs/IconPlayBtn';
import { setCurrentGame } from '../actions/game';
import { showModal } from '../actions/modal';

class Header extends Component {
  handleShowModal = (modal) => {
    if (modal === 'playOptionsModal') {
      this.props.showPlayOptionsModal(modal);
    } else if (modal === 'moreInfoModal') {
      this.props.showMoreInfoModal(modal);

      if (this.props.featureGames[0].id !== this.props.currentGame.id) {
        this.props.setCurrentGame(this.props.featureGames[0]);
      }
    }
  };

  render() {
    return (
      <div className="header">
        {this.props.featureGames.length === 0 ? (
          <div>
            <p>...Loading</p>
          </div>
        ) : (
          <div onMouseEnter={this.handleMouseEnter}>
            <div className="header__container-one">
              <div>
                <h1 className="header__heading">
                  {this.props.featureGames[0].name}
                </h1>
                <p>{this.props.featureGames[0].summary}</p>
              </div>
              <div className="header__btns">
                <button
                  onClick={() => this.handleShowModal('playOptionsModal')}
                  className="btn play-btn"
                >
                  <span>Play</span>
                  <span className="icon__container">
                    <IconPlayBtn />
                  </span>
                </button>
                <button
                  onClick={() => this.handleShowModal('moreInfoModal')}
                  className="btn more-info-btn"
                >
                  <span>More Info</span>
                  <span className="icon__container">
                    <IconInfoBtn />
                  </span>
                </button>
              </div>
            </div>
            <div className="header__video-game-image">
              <img
                src={this.props.featureGames[0].cover.url.replace(
                  'thumb',
                  '720p'
                )}
                alt="feature game"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  featureGames: state.game.featureGames,
  currentGame: state.game.currentGame,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentGame: (currentGame) => dispatch(setCurrentGame(currentGame)),
  showMoreInfoModal: () => dispatch(showModal('moreInfoModal')),
  showPlayOptionsModal: () => dispatch(showModal('playOptionsModal')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
