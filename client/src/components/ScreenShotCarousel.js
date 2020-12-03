import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import IconBroken from '../svgs/IconBroken';

const ScreenShotCarousel = (props) => {
  const settings = {
    arrows: false,
    autoplay: true,
  };

  return (
    <>
      {props.currentGame.screenshots ? (
        <Slider {...settings}>
          {props.currentGame.screenshots &&
            props.currentGame.screenshots.map(({ id, url }) => (
              <img
                src={url.replace('thumb', 'screenshot_big')}
                alt="video game screenshot"
                key={id}
                className="more-info-modal__screen-shots"
              />
            ))}
        </Slider>
      ) : (
        <div className="more-info-modal__unavailable-screenshots">
          <p className="more-info-modal__unavailable-screenshots-description">
            Unavailable Screen Shots
          </p>
          <div>
            <IconBroken />
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentGame: state.game.currentGame,
});

export default connect(mapStateToProps)(ScreenShotCarousel);
