import React from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import IconLeftArrow from '../svgs/IconLeftArrow';

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
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default WatchPage;
