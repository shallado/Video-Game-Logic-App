import React from 'react';
import { Link } from 'react-router-dom';
import IconLeftArrow from '../svgs/IconLeftArrow';
import ReactPlayer from 'react-player/youtube';

const WatchPage = (props) => {
  return (
    <div className="watch">
      <div className="watch__left-arrow-icon-container">
        <div>
          <Link to="/dashboard" className="watch__link">
            <IconLeftArrow />
          </Link>
        </div>
      </div>
      <div className="watch__video-player-container">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${props.match.params.id}`}
          controls={true}
        />
      </div>
    </div>
  );
};

export default WatchPage;
