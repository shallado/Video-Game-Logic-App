import axios from 'axios';
import { loadTodoSuccess, loadTodoError } from './error';
import { setCurrentUser, removeCurrentUser } from './user';

export const startSignUp = (userInfo) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: '/auth/signup',
      data: {
        ...userInfo,
      },
    })
      .then((response) => {
        dispatch(loadTodoSuccess(response.data));
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

export const signIn = () => ({
  type: 'SIGN_IN',
});

export const startSignIn = (userCredentials) => {
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
        const {
          username,
          email,
          city,
          zipcode,
          birthday,
          gender,
          id,
          token,
          profilePhoto,
          videoGames,
        } = response.data.data;

        dispatch(
          setCurrentUser({
            id,
            username,
            email,
            city,
            zipcode,
            birthday,
            gender,
            token,
            profilePhoto,
            videoGames,
          })
        );
        dispatch(signIn());
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

export const signOut = () => ({
  type: 'SIGN_OUT',
});
