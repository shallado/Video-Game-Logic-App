import axios from 'axios';
import loadingError from '../utils/loadingError';
import { loadSuccess, loadError } from './error';
import { setCurrentUser } from './user';

export const startSignUp = (userInfo) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: '/auth/signup',
      data: {
        ...userInfo,
      },
    })
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
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const signOut = () => ({
  type: 'SIGN_OUT',
});
