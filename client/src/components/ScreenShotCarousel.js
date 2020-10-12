import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

const settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const ScreenShotCarousel = (props) => (
  <Slider {...settings}>
    {props.currentGame.screenshots.map(({ id, url }) => {
      return (
        <div key={id}>
          <img src={url.replace('thumb', 'logo_med')} />
        </div>
      );
    })}
  </Slider>
);

const mapStateToProps = (state) => ({
  currentGame: state.game.currentGame,
});

export default connect(mapStateToProps)(ScreenShotCarousel);
