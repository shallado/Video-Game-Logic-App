import axios from 'axios';
import loadingError from '../utils/loadingError';
import { loadError } from './error';

export const getFeatureGames = (featureGames) => ({
  type: 'GET_FEATURE_GAMES',
  featureGames,
});

export const getCategoryGame = (categoryGames) => ({
  type: 'GET_CATEGORY_GAMES',
  categoryGames,
});

export const updateCategoryGame = (categoryIndex, updateGames) => ({
  type: 'UPDATE_CATEGORY_GAMES',
  updateGames,
  categoryIndex,
});

export const setMoreCategoryGames = (categoryGames = []) => ({
  type: 'SET_MORE_CATEGORY_GAMES',
  categoryGames,
});

export const startGetGames = (queriesInfo, categoryIndex) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: '/igdb',
      data: queriesInfo,
    })
      .then((response) => {
        const queryResults = response.data;

        if (queriesInfo[0].type === 'moreCategory') {
          dispatch(setMoreCategoryGames(queryResults[0][0]));
        } else if (queryResults[0].length === 1) {
          dispatch(updateCategoryGame(categoryIndex, queryResults[0]));
        } else {
          dispatch(getFeatureGames(queryResults[1]));
          dispatch(getCategoryGame(queryResults[0]));
        }
      })
      .catch((err) => {
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const videoGameSearchResults = (videoGames) => ({
  type: 'VIDEO_GAME_SEARCH_RESULTS',
  videoGames,
});

export const startVideoGameSearchResults = (title) => {
  return (dispatch) => {
    const request = {
      method: 'post',
      url: '/igdb',
      data: title,
    };

    axios(request)
      .then((response) => dispatch(videoGameSearchResults(response.data)))
      .catch((err) => {
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const setCurrentGame = (currentGame) => ({
  type: 'SET_CURRENT_GAME',
  currentGame,
});

export const setGenre = (genre) => ({
  type: 'SET_GENRE',
  genre,
});

export const setPage = (page) => ({
  type: 'SET_PAGE',
  page,
});

export const setOffset = (offset) => ({
  type: 'SET_OFFSET',
  offset,
});

export const updateOffset = (update) => ({
  type: 'UPDATE_OFFSET',
  update,
});

export const resetGames = () => ({
  type: 'RESET_GAMES',
});

export const resetMoreGames = () => ({
  type: 'RESET_MORE_GAMES',
});
