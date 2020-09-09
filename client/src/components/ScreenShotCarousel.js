import React, { Component } from 'react';
import Slider from 'react-slick';

const settings = {
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const ScreenShotCarousel = (props) => (
  <Slider {...settings}>
    {props.gameInfo.screenshots.map(({ id, url }) => (
      <div key={id}>
        <img src={url.replace('thumb', 'logo_med')} />
      </div>
    ))}
  </Slider>
);

export default ScreenShotCarousel;
