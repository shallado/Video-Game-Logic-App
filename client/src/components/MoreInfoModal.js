import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Map from './Map';
import VideoGameReviews from './VideoGameReviews';
import AddReviewModal from './AddReviewModal';
import PlayOptionsModal from './PlayOptionsModal';
import IconInfoBtn from '../svgs/IconInfoBtn';
import ScreenShotCarousel from './ScreenShotCarousel';
import { startSetVideoGameReviews } from '../actions/review';

class MoreInfoModal extends Component {
  state = {
    modalIsOpen: false,
    lng: 5,
    lat: 34,
    zoom: 2,
  };

  handleOpenModal = () => {
    this.setState(() => ({ modalIsOpen: true }));
  };

  handleCloseModal = () => {
    this.setState(() => ({ modalIsOpen: false }));
  };

  render() {
    const {
      age_ratings,
      summary,
      involved_companies,
      genres,
      platforms,
    } = this.props.gameInfo;

    return (
      <div>
        <button className="btn header__more-info-btn">
          <span className="header__btn-text">More Info</span>
          <IconInfoBtn />
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleCloseModal}
        >
          <div>
            <ion-icon name="close" onClick={this.handleCloseModal}></ion-icon>
            <ScreenShotCarousel />
            <PlayOptionsModal />
            <div>
              <ion-icon name="add-circle"></ion-icon>
            </div>
          </div>
          <div>
            <h4>Game Info</h4>
          </div>
          <div>
            <div>
              <h5>ESRB Rating:</h5>
              {age_ratings &&
                age_ratings.map(({ id, rating }) => <p key={id}>{rating}</p>)}
              <h5>Summary:</h5>
              <p>{summary}</p>
            </div>
            <div>
              <h5>Involved Companies:</h5>
              {involved_companies.map(({ id, company }) => (
                <p key={id}>{company.name}</p>
              ))}
              <h5>Genres:</h5>
              {genres.map(({ id, name }) => (
                <p key={id}>{name}</p>
              ))}
              <h5>Platforms:</h5>
              {platforms.map(({ id, name }) => (
                <p key={id}>{name}</p>
              ))}
            </div>
          </div>
          <div>
            <h4>MarketPlace Suggestions</h4>
            <div>
              <h6>Digital Stores</h6>
              <a href="https://www.amazon.com/">Amazon</a>
              <a href="https://www.gamestop.com/">GameStop</a>
              <a href="https://store.playstation.com/en-us/home/games">
                PlayStation MarketPlace
              </a>
              <a href="https://www.xbox.com/en-US/microsoft-store">
                Xbox Store
              </a>
              <a href="https://store.steampowered.com/">Steam</a>
              <a href="https://www.target.com/">Walmart</a>
              <a href="https://www.walmart.com/">Target</a>
              <a href="https://www.bestbuy.com/">Best Buy</a>
            </div>
            <Map />
          </div>
          <div>
            <h4>Reviews</h4>
            <AddReviewModal gameInfo={this.props.gameInfo} />
            <VideoGameReviews />
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentGame: state.game.currentGame,
});

const mapDispatchToProps = (dispatch) => ({
  startSetVideoGameReviews: (title) =>
    dispatch(startSetVideoGameReviews(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoModal);
