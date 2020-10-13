import axios from 'axios';
import { loadTodoError } from './error';

export const startAddReview = ({ title, username, review } = {}) => {
  return (dispatch) => {
    const requestOne = {
      method: 'post',
      url: '/video-games',
      data: {
        title,
      },
    };
    const requestTwo = {
      method: 'post',
      url: '/reviews',
      data: {
        username,
        title,
        review,
      },
    };

    axios(requestOne)
      .then(() => {
        return axios(requestTwo);
      })
      .then((responseTwo) => {
        console.log(responseTwo);
      })
      .catch((err) => {
        let error;

        if (err.response) {
          error = {
            data: err.response.data,
            status: err.response.status,
          };
        } else if (err.request) {
          error = err.request;
        } else {
          error = err.message;
        }

        dispatch(loadTodoError(error));
      });
  };
};

export const setUserReviews = (reviews) => ({
  type: 'SET_USER_REVIEWS',
  reviews,
});

export const startSetUserReviews = (username) => {
  return (dispatch) => {
    const request = {
      method: 'get',
      url: `/reviews?username=${username}`,
    };

    axios(request)
      .then((response) => {
        const reviews = response.data;

        dispatch(setUserReviews(reviews));
      })
      .catch((err) => {
        let error;

        if (err.response) {
          error = {
            data: err.response.data,
            status: err.response.status,
          };
        } else if (err.request) {
          error = err.request;
        } else {
          error = err.message;
        }

        dispatch(loadTodoError(error));
      });
  };
};

export const setVideoGameReviews = (reviews) => ({
  type: 'SET_VIDEO_GAME_REVIEWS',
  reviews,
});

export const startSetVideoGameReviews = (title) => {
  return (dispatch) => {
    const request = {
      method: 'get',
      url: `/video-games?title=${title}`,
    };

    axios(request)
      .then((response) => {
        dispatch(setVideoGameReviews(response.data.data));
      })
      .catch((err) => {
        let error;

        if (err.response) {
          error = {
            data: err.response.data,
            status: err.response.status,
          };
        } else if (err.request) {
          error = err.request;
        } else {
          error = err.message;
        }

        dispatch(loadTodoError(error));
      });
  };
};
