import axios from 'axios';
import loadingError from '../utils/loadingError';
import { loadSuccess, loadError } from './error';
import { setCurrentUser } from './user';

export const startSignUp = (userInfo) => {
  const request = {
    method: 'post',
    url: '/auth/signup',
    data: {
      ...userInfo,
    },
  };

  return (dispatch) => {
    axios(request)
      .then(() => {
        dispatch(loadSuccess());
      })
      .catch((err) => {
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const signIn = () => ({
  type: 'SIGN_IN',
});

export const startSignIn = (userCredentials) => {
  const { email, password } = userCredentials;
  const request = {
    method: 'post',
    url: '/auth/signin',
    data: {
      email,
      password,
    },
  };

  return (dispatch) => {
    axios(request)
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
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const signOut = () => ({
  type: 'SIGN_OUT',
});

export const startSignOut = (id, token) => {
  const request = {
    method: 'post',
    url: '/auth/signout',
    data: {
      id,
      token,
    },
  };

  return (dispatch) => {
    axios(request)
      .then(() => {
        dispatch(signOut());
      })
      .catch((err) => {
        const error = loadError(err);

        dispatch(loadError(error));
      });
  };
};
