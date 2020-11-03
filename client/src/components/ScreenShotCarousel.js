import React from 'react';
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';

const ScreenShotCarousel = (props) => {
  const items = props.currentGame.screenshots.map(({ id, url }) => (
    <img
      src={url.replace('thumb', 'screenshot_huge')}
      key={id}
      className="more-info-modal__screen-shots"
    />
  ));

  return (
    <AliceCarousel
      items={items}
      infinite={true}
      disableDotsControls={true}
      disableButtonsControls={true}
      autoPlayInterval={3000}
      autoPlay={true}
      autoWidth={true}
    />
  );
};

const mapStateToProps = (state) => ({
  currentGame: state.game.currentGame,
});

export default connect(mapStateToProps)(ScreenShotCarousel);
