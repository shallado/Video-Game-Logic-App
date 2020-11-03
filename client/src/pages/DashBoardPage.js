import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddReviewModal from '../modals/AddReviewModal';
import MoreInfoModal from '../modals/MoreInfoModal';
import PlayOptionsModal from '../modals/PlayOptionsModal';
import VideoGameCategory from '../components/VideoGameCategory';
import { startGetGames } from '../actions/game';

class DashBoardPage extends Component {
  state = {
    genres: [],
    page: '',
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
        page = 'Switch';
        genres = [
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
        page = 'XONE';
        genres = [
          'Fighting',
          'Shooter',
          'Sport',
          'Racing',
          'Role-playing (RPG), Strategy',
          'Adventure',
        ];
        break;
      case '/pc':
        page = 'PC';
        genres = [
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

    this.setState(() => ({
      genres,
    }));

    if (this.props.categoryGames.length === 0) {
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
  }

  render() {
    return (
      <div className="category">
        {this.state.genres.map((genre, index) => (
          <VideoGameCategory key={index} genre={genre} index={index} />
        ))}
        <MoreInfoModal />
        <PlayOptionsModal />
        <AddReviewModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categoryGames: state.game.categoryGames,
});

const mapDispatchToProps = (dispatch) => ({
  startGetGames: (page, type, genre) =>
    dispatch(startGetGames(page, type, genre)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage);
