import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Map from '../components/Map';
import AddRemoveVideoGame from '../components/AddRemoveVideoGame';
import VideoGameReviews from '../components/VideoGameReviews';
import ScreenShotCarousel from '../components/ScreenShotCarousel';
import IconClose from '../svgs/IconClose';
import IconPlayBtn from '../svgs/IconPlayBtn';
import { hideModal, showModal } from '../actions/modal';
import { startSetVideoGameReviews } from '../actions/review';
import { startSetMapLocations } from '../actions/map';

Modal.setAppElement('#root');

class MoreInfoModal extends Component {
  handleShowModal = () => {
    this.props.showModal();
  };

  handleCloseModal = () => {
    this.props.hideModal();
  };

  componentDidUpdate(prevProps) {
    if (this.props.modals.includes('moreInfoModal')) {
      document.body.style.overflow = 'hidden';
      if (
        prevProps.videoGameReviews.reviews.length !==
          this.props.videoGameReviews.reviews.length ||
        this.props.videoGameReviews.reviews.length === 0
      ) {
        this.props.startSetVideoGameReviews(this.props.currentGame.name);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  render() {
    const {
      age_ratings = '',
      summary = '',
      involved_companies = [],
      genres = [],
      platforms = [],
    } = this.props.currentGame;

    return (
      <Modal
        isOpen={this.props.modals.includes('moreInfoModal')}
        onRequestClose={this.handleCloseModal}
        className="more-info-modal"
        overlayClassName="more-info-modal__overlay"
      >
        <div className="more-info-modal__section">
          <div className="more-info-modal__close-icon-container">
            <div onClick={this.handleCloseModal}>
              <IconClose />
            </div>
          </div>
          <ScreenShotCarousel />
          <div className="more-info-modal__btn-container">
            <button onClick={this.handleShowModal} className="btn play-btn">
              <span className="more-info-modal__btn-text">Play</span>
              <div className="icon__container">
                <IconPlayBtn />
              </div>
            </button>
            <div className="more-info-modal__btns-container">
              <AddRemoveVideoGame />
            </div>
          </div>
        </div>
        <div className="more-info-modal__section">
          <div className="heading-four__container">
            <h4 className="heading-four">Game Info</h4>
          </div>
          <div className="more-info-modal__section-container-main">
            <div className="more-info-modal__section-container-one">
              <div className="more-info-modal__ratings-container">
                <h5 className="heading-five heading-five--no-margin">
                  ESRB Rating :
                </h5>
                <ul>
                  {age_ratings &&
                    age_ratings.map(({ id, rating }) => (
                      <li key={id} className="more-info-modal__rating">
                        {rating}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="more-info-modal__summary-container">
                <h5 className="heading-five">Summary :</h5>
                <p className="more-info-modal__summary">{summary}</p>
              </div>
            </div>
            <div className="more-info-modal__section-container-two">
              <div>
                <h5 className="heading-five">Involved Companies :</h5>
                <ul>
                  {involved_companies.map(({ id, company }) => (
                    <li key={id}>{company.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="heading-five">Genres :</h5>
                <ul>
                  {genres.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="heading-five">Platforms :</h5>
                <ul>
                  {platforms.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="more-info-modal__section">
          <div className="heading-four__container">
            <h4 className="heading-four">MarketPlace Suggestions</h4>
          </div>
          <div className="more-info-modal__marketplace">
            <div className="more-info-modal__marketplace-digital">
              <h5 className="heading-five">Digital Stores</h5>
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
        </div>
        <div className="more-info-modal__section">
          <div className="heading-four__container">
            <h4 className="heading-four">Reviews</h4>
          </div>
          <div className="more-info-modal__reviews-container-main">
            {this.props.userReview !== undefined ? (
              <Link
                to={`/review/${this.props.userReview._id}`}
                className="btn add-review-btn"
              >
                Update Review
              </Link>
            ) : (
              <Link to="/review" className="btn add-review-btn">
                Add Review
              </Link>
            )}
            <VideoGameReviews />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  currentGame: state.game.currentGame,
  modals: state.modals,
  userReview: state.review.videoGameReviews.reviews.find(
    (review) => review.username === state.user.username
  ),
  videoGameReviews: state.review.videoGameReviews,
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal('moreInfoModal')),
  showModal: () => dispatch(showModal('playOptionsModal')),
  startSetVideoGameReviews: (title) =>
    dispatch(startSetVideoGameReviews(title)),
  startSetMapLocations: () => dispatch(startSetMapLocations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoModal);
