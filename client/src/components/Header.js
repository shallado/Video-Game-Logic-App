import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { startGetFeatureGames } from '../actions/game';

class Header extends Component {
  state = {
    featuredGames: '',
  };

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

    this.props.startGetFeatureGames(page, 'featured').then((data) => {
      this.setState(() => ({ featuredGames: data }));
    });
  }

  render() {
    if (this.state.featuredGames) {
      console.log(this.state.featuredGames);
      return (
        <div>
          <h1>{this.state.featuredGames[0].name}</h1>
          <p>{this.state.featuredGames[0].summary}</p>
          <img
            src={this.state.featuredGames[0].cover.url.replace(
              'thumb',
              '1080p'
            )}
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
    } else {
      return <div>...Loading</div>;
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  startGetFeatureGames: (page, type) =>
    dispatch(startGetFeatureGames(page, type)),
});

export default withRouter(connect(null, mapDispatchToProps)(Header));
