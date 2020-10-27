import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddRemoveVideoGame from './AddRemoveVideoGame';
import MoreInfoModal from './MoreInfoModal';
import ScreenShotCarousel from './ScreenShotCarousel';
import PlayOptionsModal from './PlayOptionsModal';
import { setCurrentGame } from '../actions/game';

class VideoGameCard extends Component {
  state = {
    hover: false,
  };

  handleMouseEnter = () => {
    this.setState(() => ({ hover: true }));
    this.props.setCurrentGame(this.props.gameInfo);
  };

  handleMouseLeave = () => {
    this.setState(() => ({ hover: false }));
  };

  render() {
    return (
      <div className="video-game-card">
        {/* {this.state.hover ? (
          <div onMouseLeave={this.handleMouseLeave}>
            <div>
              <ScreenShotCarousel gameInfo={this.props.gameInfo} />
            </div>
            <div>
              <div>
                <PlayOptionsModal gameInfo={this.props.gameInfo} />
                <AddRemoveVideoGame />
                <MoreInfoModal gameInfo={this.props.gameInfo} />
              </div>
              <div>
                {this.props.gameInfo.age_ratings && (
                  <div>
                    <p>Rated</p>
                    {this.props.gameInfo.age_ratings.map(({ rating, id }) => (
                      <p key={id}>{rating}</p>
                    ))}
                  </div>
                )}
                <div>
                  <p>Genre</p>
                  {this.props.gameInfo.genres.map(({ name, id }) => (
                    <p key={id}>{name}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <img
            onMouseEnter={this.handleMouseEnter}
            src={this.props.gameInfo.cover.url.replace('thumb', 'logo_med')}
          />
        )} */}
        <img
          onMouseEnter={this.handleMouseEnter}
          src={this.props.gameInfo.cover.url.replace('thumb', 'cover_big')}
          className="video-game-card__img"
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentGame: (currentGame) => dispatch(setCurrentGame(currentGame)),
});

export default connect(null, mapDispatchToProps)(VideoGameCard);
