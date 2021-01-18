import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import VideoGameCard from './VideoGameCard';
import IconRightArrow from '../svgs/IconRightArrow';
import {
  startGetGames,
  setPage,
  updateOffset,
  setGenre,
} from '../actions/game';

class VideoGameCategory extends Component {
  state = {
    currentIndex: 0,
    oldIndex: 0,
  };

  handleAfterChange = (oldIndex) => {
    if (this.props.offset <= 36 && this.state.oldIndex < oldIndex) {
      this.props.startGetGames(
        [
          {
            page: this.props.page,
            type: 'category',
            genres: [this.props.genre],
            offset: this.props.offset,
          },
        ],
        this.props.categoryIndex
      );

      this.setState(() => ({
        oldIndex,
      }));

      this.props.updateOffset(5);
    }
  };

  handleSetGenre = (genre) => {
    this.props.setGenre(genre);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.categoryGame.length !== nextProps.categoryGame.length ||
      this.props.genre === undefined
    );
  }

  render() {
    const settings = {
      slidesToShow: 5,
      slidesToScroll: 5,
      afterChange: this.handleAfterChange,
      speed: 2000,
      infinite: false,
      lazyLoad: true,
      responsive: [
        {
          breakpoint: 1050,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 449,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className="category__container">
        <Link
          to={`/category`}
          onClick={() => this.handleSetGenre(this.props.genre)}
          className="category__heading-container"
        >
          <h2 className="category__heading">{this.props.genre}</h2>
          <IconRightArrow />
        </Link>
        <Slider {...settings}>
          {this.props.categoryGame.map((gameInfo) => (
            <VideoGameCard
              key={gameInfo.id}
              categoryIndex={this.props.categoryIndex}
              gameInfo={gameInfo}
            />
          ))}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.game.page,
  offset: state.game.offset,
});

const mapDispatchToProps = (dispatch) => ({
  startGetGames: (page, type, genre) =>
    dispatch(startGetGames(page, type, genre)),
  setPage: (page) => dispatch(setPage(page)),
  updateOffset: (update) => dispatch(updateOffset(update)),
  setGenre: (genre) => dispatch(setGenre(genre)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameCategory);
