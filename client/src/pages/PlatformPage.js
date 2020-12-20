import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoGameCategory from '../components/VideoGameCategory';
import { startGetGames, reset, setPage, setOffset } from '../actions/game';
import { startSetMapLocations, resetMap } from '../actions/map';

class PlatformPage extends Component {
  state = {
    genres: [],
  };

  componentDidMount() {
    const { pathname } = this.props.history.location;
    let genres;
    let page;
    let featuredGenre;

    switch (pathname) {
      case '/dashboard':
        page = 'Dashboard';
        genres = [
          'Platform',
          'Adventure',
          'Arcade',
          'Shooter',
          'Indie',
          'Sport',
        ];
        featuredGenre = [genres[1]];
        break;
      case '/nintendo':
        page = 'Nintendo Switch';
        genres = [
          'Arcade',
          'Sport',
          'Adventure',
          'Arcade',
          'Puzzle',
          'Shooter',
        ];
        featuredGenre = [genres[2]];
        break;
      case '/playstation':
        page = 'PlayStation 4';
        genres = [
          "Hack and slash/Beat 'em up",
          'Fighting',
          'Role-playing (RPG)',
          'Indie',
          'Racing',
          'Shooter',
        ];
        featuredGenre = [genres[3]];
        break;
      case '/xbox':
        page = 'Xbox One';
        genres = [
          'Tactical',
          'Shooter',
          'Indie',
          'Racing',
          'Role-playing (RPG)',
          'Adventure',
        ];
        featuredGenre = [genres[4]];
        break;
      case '/pc':
        page = 'PC (Microsoft Windows)';
        genres = [
          'Simulator',
          'Real Time Strategy (RTS)',
          'Role-playing (RPG)',
          'Puzzle',
          'Shooter',
          "Hack and slash/Beat 'em up",
        ];
        featuredGenre = [genres[5]];
        break;
      default:
        page = '';
    }

    this.setState(() => ({
      genres,
    }));

    this.props.setPage(page);

    this.props.setOffset(11);

    this.props.startGetGames([
      {
        page,
        type: 'category',
        genres,
      },
      {
        page,
        type: 'featured',
        genres: featuredGenre,
      },
    ]);

    this.props.startSetMapLocations();
  }

  componentWillUnmount() {
    if (!this.props.openModals.includes('moreInfoModal')) {
      this.props.reset();
      this.props.resetMap();
    }
  }

  render() {
    return (
      <div className="category">
        {this.state.genres.map((genre, index) => (
          <VideoGameCategory key={index} genre={genre} categoryIndex={index} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  openModals: state.modals.openModals,
  username: state.user.username,
  categoryGames: state.game.categoryGames,
});

const mapDispatchToProps = (dispatch) => ({
  startGetGames: (page, type, genre) =>
    dispatch(startGetGames(page, type, genre)),
  reset: () => dispatch(reset()),
  setPage: (page) => dispatch(setPage(page)),
  setOffset: (offset) => dispatch(setOffset(offset)),
  startSetMapLocations: () => dispatch(startSetMapLocations()),
  resetMap: () => dispatch(resetMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlatformPage);
