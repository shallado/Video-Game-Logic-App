import axios from 'axios';
import { loadTodoError } from './error';

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

export const startGetGames = (queriesInfo, categoryIndex) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: '/igdb',
      data: queriesInfo,
    })
      .then((response) => {
        const queryResults = response.data;

        if (queryResults[0].length === 1) {
          dispatch(updateCategoryGame(categoryIndex, queryResults[0]));
        } else {
          dispatch(getFeatureGames(queryResults[1]));
          dispatch(getCategoryGame(queryResults[0]));
        }
      })
      .catch((err) => {
        let error;

        if (err.response) {
          error = err.response.data;
        } else if (err.request) {
          error = err.request;
        } else {
          error = err.message;
        }

        dispatch(loadTodoError(error));
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
        let error;

        if (err.response) {
          error = err.response.data;
        } else if (err.request) {
          error = err.request;
        } else {
          error = err.message;
        }

        dispatch(loadTodoError(error));
      });
  };
};

export const setCurrentGame = (currentGame) => ({
  type: 'SET_CURRENT_GAME',
  currentGame,
});

export const resetGames = () => ({
  type: 'RESET_GAMES',
});
