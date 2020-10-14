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

export const signIn = (userId) => ({
  type: 'SIGN_IN',
  userId,
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
        if (response.status === 200) {
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
          dispatch(signIn(id));
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

export const signOut = () => ({
  type: 'SIGN_OUT',
});

export const startSignOut = () => {
  return (dispatch) => {
    dispatch(signOut());
    dispatch(removeCurrentUser());
  };
};
