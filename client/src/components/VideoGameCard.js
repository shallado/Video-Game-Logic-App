import React, { Component } from 'react';
import ScreenShotCarousel from './ScreenShotCarousel';

class VideoGameCard extends Component {
  state = {
    hover: false,
  };

  handleMouseEnter = () => {
    console.log('enter');
    this.setState(() => ({ hover: true }));
  };

  handleMouseLeave = () => {
    console.log('leave');
    this.setState(() => ({ hover: false }));
  };

  render() {
    console.log(this.props.gameInfo);
    return (
      <div>
        {this.state.hover ? (
          <div onMouseLeave={this.handleMouseLeave}>
            <div>
              <ScreenShotCarousel gameInfo={this.props.gameInfo} />
            </div>
            <div>
              <div>
                <ion-icon name="caret-forward-circle"></ion-icon>
                <ion-icon name="information-circle"></ion-icon>
                <ion-icon name="add-circle"></ion-icon>
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
