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
        const ratingScale = new Map();
        const gameRating = [
          'Three',
          'Seven',
          'Twelve',
          'Sixteen',
          'Eighteen',
          'RP',
          'EC',
          'E',
          'E10',
          'T',
          'M',
          'AO',
        ];

        for (let i = 1; i < 13; i++) {
          ratingScale.set(i, gameRating[i - 1]);
        }

        for (let userInfo of data.data) {
          const { age_ratings } = userInfo;

          if (age_ratings) {
            for (let age_rating of age_ratings) {
              age_rating.rating = ratingScale.get(age_rating.rating);
            }
          }
        }

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

export const setCurrentGame = (currentGame) => ({
  type: 'SET_CURRENT_GAME',
  currentGame,
});
