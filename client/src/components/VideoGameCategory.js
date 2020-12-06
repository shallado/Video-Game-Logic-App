import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import VideoGameCard from './VideoGameCard';
import IconRightArrow from '../svgs/IconRightArrow';
import IconLoading from '../svgs/IconLoading';
import {
  startGetGames,
  setPage,
  updateOffset,
  setGenre,
} from '../actions/game';

class VideoGameCategory extends Component {
  state = {
    currentIndex: 0,
    numCards: [],
    newIndex: 0,
  };

  handleBeforeChange = (oldIndex, newIndex) => {
    if (this.props.offset <= 36 && this.state.newIndex < newIndex) {
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
        slideChange: true,
        newIndex,
      }));

      this.props.updateOffset(5);
    }
  };

  handleSetGenre = (genre) => {
    this.props.setGenre(genre);
  };

  componentDidMount() {
    const numCards = [];

    for (let i = 0; i < 40; i++) {
      numCards.push(i);
    }

    this.setState(() => ({
      numCards,
    }));
  }

  render() {
    const settings = {
      slidesToShow: 5,
      slidesToScroll: 5,
      beforeChange: this.handleBeforeChange,
      speed: 2000,
      infinite: false,
      responsive: [
        {
          breakpoint: 1050,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 450,
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
        <div className="category__carousel-container">
          {this.props.categoryGamesCount === 0 ? (
            <div className="category__loading-container">
              <IconLoading />
            </div>
          ) : (
            <Slider {...settings}>
              {this.state.numCards.map((positionIndex, index) => (
                <VideoGameCard
                  key={index}
                  categoryIndex={this.props.categoryIndex}
                  positionIndex={positionIndex}
                />
              ))}
            </Slider>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categoryGames: state.game.categoryGames[ownProps.categoryIndex],
  categoryGamesCount: !!!state.game.categoryGames[ownProps.categoryIndex]
    ? 0
    : state.game.categoryGames[ownProps.categoryIndex].length,
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
