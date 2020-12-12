import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import VideoGameList from '../components/VideoGameList';
import IconLeftArrowTwo from '../svgs/IconLeftArrowTwo';
import IconRightArrowThree from '../svgs/IconRightArrowThree';
import { startGetGames, reset, setMoreCategoryGames } from '../actions/game';

class PlatformMorePage extends Component {
  state = {
    currentGames: [],
    currentPage: 1,
    gamesSet: undefined,
    pageCount: 0,
    pageSegments: [],
    currentPageSegment: 0,
    startOffset: 0,
    endOffset: 0,
    updateCount: 0,
  };

  handlePageChange = ({ selected }) => {
    if (!!this.state.gamesSet) {
      const currentPage = selected + 1;
      const currentPageSegment = this.state.pageSegments.findIndex(
        (pageSegment) => pageSegment.includes(currentPage)
      );
      const pageSegment = [];
      const startOffset = (selected % 10) * 40;
      const endOffset = (currentPage % 10 === 0 ? 10 : currentPage % 10) * 40;
      let gamesSet = 'page change';
      let videoGamesDbOffSet;
      let videoGamesDbOffSets;

      const getGames = (offset) => {
        this.props.startGetGames([
          {
            page: this.props.page,
            type: 'moreCategory',
            genres: [this.props.genre],
            offset,
          },
        ]);
      };

      const changeState = (gamesSet, pageSegment = []) => {
        this.setState((prevState) => ({
          gamesSet,
          pageSegments: prevState.pageSegments.concat(pageSegment),
          currentPageSegment,
        }));
      };

      this.setState(() => ({
        currentPage,
        startOffset,
        endOffset,
        gamesSet,
      }));

      if (
        this.state.pageCount === currentPage &&
        currentPage % 10 === 0 &&
        !this.state.pageSegments[this.state.currentPageSegment].includes(
          currentPage
        )
      ) {
        videoGamesDbOffSets = [
          (currentPageSegment + 1) * 10 * 40 + 1,
          currentPageSegment * 10 * 40 + 1,
        ];
        gamesSet = 'updates and increase page number';
        videoGamesDbOffSets.forEach((videoGamesDbOffSet, index) => {
          getGames(videoGamesDbOffSet);

          if (index === 0) {
            for (let i = currentPage + 1; pageSegment.length < 10; i++) {
              pageSegment.push(i);
            }

            changeState(gamesSet, [pageSegment]);
          }
        });
      } else if (
        this.state.pageCount === currentPage &&
        currentPage % 10 === 0
      ) {
        // when you reach the highest page and want to add a new segment
        gamesSet = 'update and increase page number';
        videoGamesDbOffSet = (currentPageSegment + 1) * 10 * 40 + 1;

        for (let i = currentPage + 1; pageSegment.length < 10; i++) {
          pageSegment.push(i);
        }

        getGames(videoGamesDbOffSet);
        changeState(gamesSet, [pageSegment]);
      } else if (
        !this.state.pageSegments[this.state.currentPageSegment].includes(
          currentPage
        )
      ) {
        const gamesSet = 'update and page change';

        if (currentPageSegment === 0) {
          videoGamesDbOffSet = undefined;
        } else {
          videoGamesDbOffSet = currentPageSegment * 10 * 40 + 1;
        }

        getGames(videoGamesDbOffSet);
        changeState(gamesSet, undefined);
      }
    }
  };

  componentDidUpdate(prevProps) {
    let gamesSet;
    let pageCount;
    let currentGames;
    let updateCount;

    const changeState = (
      pageCount = 0,
      currentGames = this.props.moreCategoryGames.slice(
        this.state.startOffset,
        this.state.endOffset
      ),
      updateCount = 0,
      gamesSet = 'initial'
    ) => {
      // place the set state call in here so we only have one state call
      this.setState((prevState) => ({
        pageCount: (prevState.pageCount += pageCount),
        currentGames,
        gamesSet,
        updateCount,
      }));
    };

    if (!!!this.state.gamesSet && this.props.moreCategoryGames.length !== 0) {
      pageCount = Math.ceil(this.props.moreCategoryGames.length / 40);
      currentGames = this.props.moreCategoryGames.slice(0, 40);

      changeState(pageCount, currentGames);
    } else if (
      this.state.gamesSet === 'updates and increase page number' &&
      this.props.moreCategoryGames[0].name !==
        prevProps.moreCategoryGames[0].name
    ) {
      if (this.state.updateCount === 0) {
        pageCount = Math.ceil(this.props.moreCategoryGames.length / 40);
        updateCount = 1;
        gamesSet = 'updates and increase page number';

        changeState(pageCount, undefined, updateCount, gamesSet);
      } else {
        changeState();
      }
    } else if (
      this.state.gamesSet === 'update and increase page number' &&
      this.props.moreCategoryGames[0].name !==
        prevProps.moreCategoryGames[0].name
    ) {
      pageCount = Math.ceil(this.props.moreCategoryGames.length / 40);
      currentGames = prevProps.moreCategoryGames.slice(
        this.state.startOffset,
        this.state.endOffset
      );

      this.props.setMoreCategoryGames(prevProps.moreCategoryGames);

      changeState(pageCount, currentGames);
    } else if (
      this.state.gamesSet === 'update and page change' &&
      this.props.moreCategoryGames[0].name !==
        prevProps.moreCategoryGames[0].name
    ) {
      changeState();
    } else if (this.state.gamesSet === 'page change') {
      currentGames = this.props.moreCategoryGames.slice(
        this.state.startOffset,
        this.state.endOffset
      );

      changeState(undefined, currentGames);
    }
  }

  componentDidMount() {
    const pageSegment = [];

    this.props.startGetGames([
      {
        page: this.props.page,
        type: 'moreCategory',
        genres: [this.props.genre],
      },
    ]);

    for (let i = 1; i <= 10; i++) {
      pageSegment.push(i);
    }

    this.setState((prevState) => ({
      pageSegments: prevState.pageSegments.concat([pageSegment]),
    }));
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    return (
      <div className="platform-more-page">
        <VideoGameList
          urlPath={this.props.match.path}
          handlePageCountIncrease={this.handlePageCountIncrease}
          currentGames={this.state.currentGames}
        />
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
          pageCount={this.state.pageCount}
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
  page: state.game.page,
  genre: state.game.genre,
  moreCategoryGames: state.game.moreCategoryGames,
});

const mapDispatchToProps = (dispatch) => ({
  startGetGames: (page, type, genre) =>
    dispatch(startGetGames(page, type, genre)),
  reset: () => dispatch(reset()),
  setMoreCategoryGames: (categoryGames) =>
    dispatch(setMoreCategoryGames(categoryGames)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlatformMorePage);
