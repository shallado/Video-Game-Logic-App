import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddRemoveVideoGame from './AddRemoveVideoGame';
import PlayOptionsModal from './PlayOptionsModal';
import MoreInfoModal from './MoreInfoModal';
import { setCurrentGame } from '../actions/game';

class Header extends Component {
  handleMouseEnter = () => {
    this.props.setCurrentGame(this.props.featureGames[0]);
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
                <PlayOptionsModal gameInfo={this.props.featureGames[0]} />
                <MoreInfoModal gameInfo={this.props.featureGames[0]} />
                <AddRemoveVideoGame />
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
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentGame: (currentGame) => dispatch(setCurrentGame(currentGame)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
