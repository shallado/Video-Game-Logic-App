import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { startGetGames } from '../actions/game';

class Header extends Component {
  componentDidMount() {
    const { pathname } = this.props.history.location;
    let page;

    switch (pathname) {
      case '/dashboard':
        page = 'Dashboard';
        break;
      case '/nintendo':
        page = 'Switch';
        break;
      case '/playstation':
        page = 'PS4';
        break;
      case '/xbox':
        page = 'XONE';
        break;
      case '/pc':
        page = 'PC';
        break;
      default:
        page = '';
    }

    this.props.startGetGames(page, 'featured');
  }

  render() {
    return (
      <div>
        <h1>{this.props.featureGames[0].name}</h1>
        <p>{this.props.featureGames[0].summary}</p>
        <img
          src={this.props.featureGames[0].cover.url.replace('thumb', '1080p')}
          height={600}
          width={1250}
        />
        <div>
          <ion-icon name="caret-forward-circle"></ion-icon>
          <button>Play</button>
        </div>
        <div>
          <ion-icon name="information-circle"></ion-icon>
          <button>More Info</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  featureGames: state.game.featureGames.data,
});

const mapDispatchToProps = (dispatch) => ({
  startGetGames: (page, type) => dispatch(startGetGames(page, type)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));