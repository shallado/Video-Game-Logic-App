import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import VideoGameList from '../components/VideoGameList';
import IconLeftArrowTwo from '../svgs/IconLeftArrowTwo';
import IconRightArrowThree from '../svgs/IconRightArrowThree';
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
          nextLabel={
            <div className="icon__container">
              <IconRightArrowThree />
            </div>
          }
          breakLabel={'...'}
          containerClassName={'platform-more-page__pagination'}
          pageClassName={'platform-more-page__pagination-numbers'}
          activeClassName={'platform-more-page__pagination-active'}
          pageLinkClassName={'platform-more-page__pagination-link'}
          previousLinkClassName={'platform-more-page__pagination-previous-link'}
          nextLinkClassName={'platform-more-page__pagination-next-link'}
          initialPage={0}
          pageCount={10}
          pageRangeDisplayed={1}
          marginPagesDisplayed={5}
          previousLabel={
            <div className="icon__container">
              <IconLeftArrowTwo />
            </div>
          }
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
