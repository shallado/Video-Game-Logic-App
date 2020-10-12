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

        console.log(error);
      });
  };
};

// check to see if the game is there
// if its there post && '/reviews' && { username, review, title }
// if not post && '/video-games' && { title } -> post && '/reviews' && { username, review, title }
//
