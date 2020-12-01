import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import IconLeftArrow from '../svgs/IconLeftArrow';

class WatchPage extends Component {
  handleRouteRedirect = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="watch">
        <div className="watch__left-arrow-icon-container">
          <div>
            <div onClick={this.handleRouteRedirect} className="watch__link">
              <IconLeftArrow />
            </div>
          </div>
        </div>
        <div className="watch__video-player-container">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${this.props.match.params.id}`}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
      </div>
    );
  }
}

export default WatchPage;
