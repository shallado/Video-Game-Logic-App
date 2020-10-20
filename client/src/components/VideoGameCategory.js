import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoGameCard from './VideoGameCard';

class VideoGameCategory extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.genre}</h3>
        <ion-icon name="caret-back"></ion-icon>
        {this.props.categoryGames.length === 0 ? (
          <div>
            <p>...Loading</p>
          </div>
        ) : (
          this.props.categoryGames[0][this.props.index].map((game) => {
            return <VideoGameCard gameInfo={game} key={game.id} />;
          })
        )}
        <ion-icon name="caret-forward"></ion-icon>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categoryGames: state.game.categoryGames,
});

export default connect(mapStateToProps)(VideoGameCategory);
