import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { connect } from 'react-redux';
import VideoGameCard from './VideoGameCard';
import IconRightArrow from '../svgs/IconRightArrow';

const VideoGameCategory = (props) => {
  const items =
    props.categoryGames.length > 0 &&
    props.categoryGames[0][props.index].map((game) => (
      <VideoGameCard gameInfo={game} key={game.id} />
    ));
  const responsive = {
    539: { items: 2 },
    699: { items: 3 },
    849: { items: 4 },
    1049: { items: 5 },
  };

  return (
    <div className="category__container">
      <div className="category__heading-container">
        <h2 className="category__heading">{props.genre}</h2>
        <IconRightArrow />
      </div>
      <div className="category__carousel-container">
        {props.categoryGames.length === 0 ? (
          <div>
            <p>...Loading</p>
          </div>
        ) : (
          <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            infinite={true}
            disableDotsControls={true}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categoryGames: state.game.categoryGames,
});

export default connect(mapStateToProps)(VideoGameCategory);
