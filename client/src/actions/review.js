import axios from 'axios';
import loadingError from '../utils/loadingError';
import { loadError } from './error';

export const setVideoGameReviews = (
  reviews = {
    videoGameId: 0,
    title: '',
    reviews: [],
  }
) => ({
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
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const addVideoGameReview = (userReview) => ({
  type: 'ADD_VIDEO_GAME_REVIEW',
  userReview,
});

export const startAddVideoGameReview = ({ title, username, review } = {}) => {
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

    axios
      .all([axios(requestOne), axios(requestTwo)])
      .then(
        axios.spread(() => {
          dispatch(addVideoGameReview({ username, review }));
        })
      )
      .catch((err) => {
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const editVideoGameReview = ({ username, review }) => ({
  type: 'EDIT_VIDEO_GAME_REVIEW',
  username,
  review,
});

export const startEditVideoGameReview = ({ videoGameId, username, review }) => {
  return (dispatch) => {
    const request = {
      method: 'put',
      url: `/reviews/${videoGameId}`,
      data: {
        username,
        review,
      },
    };

    axios(request)
      .then(() => {
        dispatch(editVideoGameReview({ username, review }));
      })
      .catch((err) => {
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const resetVideoGameReviews = () => ({
  type: 'RESET_VIDEO_GAME_REVIEWS',
});

export const setUserVideoGameReviews = (reviews) => ({
  type: 'SET_USER_VIDEO_GAME_REVIEWS',
  reviews,
});

export const startSetUserVideoGameReviews = (username) => {
  return (dispatch) => {
    const request = {
      method: 'get',
      url: `/reviews?username=${username}`,
    };

    axios(request)
      .then((response) => {
        const reviews = response.data.data;

        dispatch(setUserVideoGameReviews(reviews));
      })
      .catch((err) => {
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};
