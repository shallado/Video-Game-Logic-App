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

export const startGetGames = (page, type, genre = '') => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: '/igdb',
      data: {
        page,
        type,
        genre,
      },
    })
      .then((data) => {
        if (type === 'featured') {
          dispatch(getFeatureGames(data));
        } else {
          dispatch(getCategoryGame(data));
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
