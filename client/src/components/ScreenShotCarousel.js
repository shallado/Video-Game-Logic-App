import React from 'react';
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import IconBroken from '../svgs/IconBroken';

const ScreenShotCarousel = (props) => {
  const items =
    props.currentGame.screenshots &&
    props.currentGame.screenshots.map(({ id, url }) => (
      <img
        src={url.replace('thumb', 'screenshot_huge')}
        key={id}
        className="more-info-modal__screen-shots"
      />
    ));

  return (
    <>
      {props.currentGame.screenshots ? (
        <AliceCarousel
          items={items}
          infinite={true}
          disableDotsControls={true}
          disableButtonsControls={true}
          autoPlayInterval={3000}
          autoPlay={true}
          autoWidth={true}
        />
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
