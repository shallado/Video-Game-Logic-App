import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { startGetGames } from '../actions/game';
import VideoGameCard from './VideoGameCard';

class VideoGameCategory extends Component {
  state = {
    genre: '',
    ratingScale: undefined,
  };

  componentDidMount() {
    const { pathname } = this.props.history.location;
    let genre;
    let page;

    switch (pathname) {
      case '/dashboard':
        page = 'Dashboard';
        genre = [
          'Platform',
          'Adventure',
          'Arcade',
          'Shooter',
          'Indie',
          'Sport',
        ];
        break;
      case '/nintendo':
        page = 'Switch';
        genre = [
          'Music',
          'Card & Board Game',
          'Adventure',
          'Arcade',
          'Puzzle',
          'Shooter',
        ];
        break;
      case '/playstation':
        page = 'PS4';
        genre = [
          "Hack and slash/Beat 'em up",
          'Fighting',
          'Role-playing (RPG)',
          'Indie',
          'Racing',
          'Shooter',
        ];
        break;
      case '/xbox':
        page = 'XONE';
        genre = [
          'Fighting',
          'Shooter',
          'Sport',
          'Racing',
          'Role-playing (RPG), Strategy',
        ];
        break;
      case '/pc':
        page = 'PC';
        genre = [
          'Simulator',
          'Real Time Strategy (RTS)',
          'Role-playing (RPG)',
          'Puzzle',
          'Shooter',
          'Moba',
        ];
        break;
      default:
        page = '';
    }

    this.props.startGetGames(page, 'category', genre[this.props.categoryNum]);
    this.setState(() => ({
      genre: genre[this.props.genreNum],
    }));
  }

  render() {
    return (
      <div>
        <h3>{this.state.genre}</h3>
        <ion-icon name="caret-back"></ion-icon>
        {this.props.categoryGames.map((game) => {
          return <VideoGameCard gameInfo={game} key={game.id} />;
        })}
        <ion-icon name="caret-forward"></ion-icon>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categoryGames: state.game.categoryGames.data,
});

const mapDispatchToProps = (dispatch) => ({
  startGetGames: (page, type, genre) =>
    dispatch(startGetGames(page, type, genre)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VideoGameCategory)
);
