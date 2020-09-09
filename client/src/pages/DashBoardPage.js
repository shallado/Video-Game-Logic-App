import React from 'react';
import Header from '../components/Header';
import VideoGameCategory from '../components/VideoGameCategory';

const DashBoardPage = (props) => (
  <div>
    <Header />
    <VideoGameCategory genreNum={0} />
    <VideoGameCategory genreNum={1} />
    <VideoGameCategory genreNum={2} />
    <VideoGameCategory genreNum={3} />
    <VideoGameCategory genreNum={4} />
    <VideoGameCategory genreNum={5} />
  </div>
);

export default DashBoardPage;
