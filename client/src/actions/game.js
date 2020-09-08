import axios from 'axios';
import { loadTodoError } from './error';

export const getFeatureGames = () => ({
  type: 'GET_FEATURE_GAMES',
});

export const startGetFeatureGames = (page, type, genre = '') => {
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
      .then((data) => data.data)
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
