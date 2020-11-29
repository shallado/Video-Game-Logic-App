import React, { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import VideoGameCard from './VideoGameCard';
import IconRightArrow from '../svgs/IconRightArrow';
import IconLoading from '../svgs/IconLoading';
import { startGetGames } from '../actions/game';

class VideoGameCategory extends Component {
  state = {
    currentIndex: 0,
    numCards: [],
    offset: 11,
  };

  handleBeforeChange = () => {
    if (this.state.offset <= 36) {
      this.props.startGetGames(
        [
          {
            page: this.props.page,
            type: 'category',
            genres: [this.props.genre],
            offset: this.state.offset,
          },
        ],
        this.props.categoryIndex
      );

      this.setState((prevState) => ({
        slideChange: true,
        offset: (prevState.offset += 5),
      }));
    }
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
        <div className="category__heading-container">
          <h2 className="category__heading">{this.props.genre}</h2>
          <IconRightArrow />
        </div>
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
});

const mapDispatchToProps = (dispatch) => ({
  startGetGames: (page, type, genre) =>
    dispatch(startGetGames(page, type, genre)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameCategory);
