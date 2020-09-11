import React from 'react';
import { Link } from 'react-router-dom';

import ReactPlayer from 'react-player/youtube';

const WatchPage = (props) => {
  return (
    <div>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${props.match.params.id}`}
        controls={true}
      />
      <Link to="/">
        <ion-icon name="close"></ion-icon>
      </Link>
    </div>
  );
};

export default WatchPage;
