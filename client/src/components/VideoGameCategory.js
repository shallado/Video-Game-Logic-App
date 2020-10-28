import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { connect } from 'react-redux';
import VideoGameCard from './VideoGameCard';
import IconRightArrow from '../svgs/IconRightArrow';

class VideoGameCategory extends Component {
  render() {
    const items =
      this.props.categoryGames &&
      this.props.categoryGames[0][this.props.index].map((game) => (
        <VideoGameCard gameInfo={game} key={game.id} />
      ));
    const responsive = {
      1140: { items: 5 },
    };

    return (
      <div className="category__container">
        <div className="category__heading-container">
          <h2 className="category__heading">{this.props.genre}</h2>
          <IconRightArrow />
        </div>
        <div>
          {this.props.categoryGames.length === 0 ? (
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
              paddingLeft={50}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categoryGames: state.game.categoryGames,
});

export default connect(mapStateToProps)(VideoGameCategory);
