import React from 'react';
import VideoGameList from '../components/VideoGameList';

const MyListPage = (props) => (
  <div className="my-list-page">
    <VideoGameList path={props.match.path} />
  </div>
);

export default MyListPage;
