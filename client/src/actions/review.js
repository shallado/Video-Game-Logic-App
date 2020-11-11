import axios from 'axios';
import { loadTodoError } from './error';

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
        console.log(response.data.data);
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
