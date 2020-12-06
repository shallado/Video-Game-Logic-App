import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import VideoGameList from '../components/VideoGameList';
import { startGetGames, resetMoreGames, setOffset } from '../actions/game';

class PlatformMorePage extends Component {
  state = {
    currentPage: undefined,
  };

  handlePageChange = ({ selected }) => {
    const selectedPage = selected + 1;

    if (!!this.state.currentPage) {
      this.props.setOffset(selected * 41);
    }

    this.setState(() => ({
      currentPage: selectedPage,
    }));
  };

  componentDidUpdate() {
    if (!this.props.openModals.includes('moreInfoModal')) {
      this.props.startGetGames([
        {
          page: this.props.page,
          type: 'moreCategory',
          genres: [this.props.genre],
          offset: this.props.offset,
        },
      ]);
    }
  }

  componentDidMount() {
    this.props.startGetGames([
      {
        page: this.props.page,
        type: 'moreCategory',
        genres: [this.props.genre],
      },
    ]);

    this.props.setOffset(0);
  }

  componentWillUnmount() {
    this.props.resetMoreGames();
  }

  render() {
    return (
      <div className="platform-more-page">
        <VideoGameList urlPath={this.props.match.path} />
        <ReactPaginate
          nextLabel={'next'}
          breakLabel={'...'}
          containerClassName={'platform-more-page__pagination'}
          initialPage={0}
          pageCount={10}
          pageRangeDisplayed={1}
          marginPagesDisplayed={5}
          previousLabel={'previous'}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  openModals: state.modals.openModals,
  offset: state.game.offset,
  page: state.game.page,
  genre: state.game.genre,
});

const mapDispatchToProps = (dispatch) => ({
  startGetGames: (page, type, genre) =>
    dispatch(startGetGames(page, type, genre)),
  resetMoreGames: () => dispatch(resetMoreGames()),
  setOffset: (offset) => dispatch(setOffset(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlatformMorePage);
