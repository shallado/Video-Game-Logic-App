import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoGameCategory from '../components/VideoGameCategory';
import { startGetGames, resetGames, setPage, setOffset } from '../actions/game';

class PlatformPage extends Component {
  state = {
    genres: [],
  };

  componentDidMount() {
    const { pathname } = this.props.history.location;
    let genres;
    let page;

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
        break;
      case '/nintendo':
        page = 'Nintendo Switch';
        genres = ['Music', 'Sport', 'Adventure', 'Arcade', 'Puzzle', 'Shooter'];
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
        break;
      case '/xbox':
        page = 'Xbox One';
        genres = [
          'Fighting',
          'Shooter',
          'Indie',
          'Racing',
          'Role-playing (RPG)',
          'Adventure',
        ];
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
      },
    ]);
  }

  componentWillUnmount() {
    if (!this.props.openModals.includes('moreInfoModal')) {
      this.props.resetGames();
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
  resetGames: () => dispatch(resetGames()),
  setPage: (page) => dispatch(setPage(page)),
  setOffset: (offset) => dispatch(setOffset(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlatformPage);
