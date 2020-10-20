import React, { Component } from 'react';
import { withRouter } from 'react-router';
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
      <div>
        {this.props.featureGames.length === 0 ? (
          <div>
            <p>...Loading</p>
          </div>
        ) : (
          <div onMouseEnter={this.handleMouseEnter}>
            <h1>{this.props.featureGames[0].name}</h1>
            <p>{this.props.featureGames[0].summary}</p>
            <img
              src={this.props.featureGames[0].cover.url.replace(
                'thumb',
                '1080p'
              )}
              height={600}
              width={1250}
            />
            <div>
              <PlayOptionsModal gameInfo={this.props.featureGames[0]} />
            </div>
            <div>
              <MoreInfoModal gameInfo={this.props.featureGames[0]} />
            </div>
            <AddRemoveVideoGame />
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
