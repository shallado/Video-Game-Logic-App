import React, { Component } from 'react';
import Modal from 'react-modal';
import Map from './Map';
import PlayOptionsModal from './PlayOptionsModal';
import ScreenShotCarousel from './ScreenShotCarousel';

export default class MoreInfoModal extends Component {
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
        <div>
          <ion-icon
            name="information-circle"
            onClick={this.handleOpenModal}
          ></ion-icon>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleCloseModal}
        >
          <div>
            <ScreenShotCarousel gameInfo={this.props.gameInfo} />
            <PlayOptionsModal gameInfo={this.props.gameInfo} />
            <div>
              <ion-icon name="add-circle"></ion-icon>
            </div>
          </div>
          <div>
            <h4>Game Info</h4>
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
            <div ref={(el) => (this.mapContainer = el)}></div>
          </div>
          <div>
            <h4>Reviews</h4>
          </div>
        </Modal>
      </div>
    );
  }
}
