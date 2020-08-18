import axios from 'axios';
import { loadTodoSuccess, loadTodoError } from './error';

export const userSignUp = ({
  username,
  password,
  email,
  city,
  zipcode,
  birthday,
  gender,
} = {}) => ({
  type: 'USER_SIGN_UP',
  userInfo: {
    username,
    password,
    email,
    city,
    zipcode,
    birthday,
    gender,
  },
});

export const startUserSignUp = (userInfo) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: '/auth/signup',
      data: {
        ...userInfo,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadTodoSuccess(response.data));
        } else {
          dispatch(loadTodoError(response.error));
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

export const userSignIn = (email, password) => ({
  type: 'USER_SIGN_IN',
  email,
  password,
});

export const startUserSignIn = (userCredentials) => {
  const { email, password } = userCredentials;

  return (dispatch) => {
    axios({
      method: 'post',
      url: '/auth/signin',
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadTodoSuccess(response.data));
        } else {
          dispatch(loadTodoError(response.error));
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
