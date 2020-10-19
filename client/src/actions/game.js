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

export const startGetGames = (queriesInfo) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: '/igdb',
      data: queriesInfo,
    })
      .then((response) => {
        const queryResults = response.data;

        dispatch(getFeatureGames(queryResults[1]));
        dispatch(getCategoryGame([response.data[0]]));
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
