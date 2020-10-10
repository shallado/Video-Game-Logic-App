import React, { Component } from 'react';
import MoreInfoModal from './MoreInfoModal';
import ScreenShotCarousel from './ScreenShotCarousel';
import PlayOptionsModal from './PlayOptionsModal';

class VideoGameCard extends Component {
  state = {
    hover: false,
  };

  handleMouseEnter = () => {
    this.setState(() => ({ hover: true }));
  };

  handleMouseLeave = () => {
    this.setState(() => ({ hover: false }));
  };

  render() {
    return (
      <div>
        {this.state.hover ? (
          <div onMouseLeave={this.handleMouseLeave}>
            <div>
              <ScreenShotCarousel gameInfo={this.props.gameInfo} />
            </div>
            <div>
              <div>
                <PlayOptionsModal gameInfo={this.props.gameInfo} />
                <ion-icon name="add-circle"></ion-icon>
                <div>
                  <MoreInfoModal gameInfo={this.props.gameInfo} />
                </div>
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
        )}
      </div>
    );
  }
}

export default VideoGameCard;
