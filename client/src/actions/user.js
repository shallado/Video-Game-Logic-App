import axios from 'axios';
import { loadSuccess, loadError } from './error';
import loadingError from '../utils/loadingError';

export const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  userInfo: {
    ...user,
  },
});

export const userUpdate = (updates) => ({
  type: 'USER_UPDATE',
  updates,
});

export const startUserUpdate = (id, updates) => {
  return (dispatch) => {
    axios({
      method: 'put',
      url: `/users/${id}`,
      data: { ...updates },
    })
      .then((response) => {
        dispatch(userUpdate({ ...updates }));
        dispatch(loadSuccess(response.data.message));
      })
      .catch((err) => {
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const startUploadProfilePhoto = (id, imageFile) => {
  return (dispatch) => {
    axios({
      method: 'put',
      url: `/users/${id}/profilePhoto`,
      data: imageFile,
    })
      .then((response) => {
        dispatch(loadSuccess(response.data.message));
      })
      .catch((err) => {
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const addVideoGameToWatchList = (videoGame) => ({
  type: 'ADD_VIDEO_GAME_TO_WATCH_LIST',
  videoGame,
});

export const startAddVideoGameToWatchList = (userId, videoGame) => {
  return (dispatch) => {
    const request = {
      method: 'put',
      url: `/users/${userId}/video-games`,
      data: {
        videoGame: {
          ...videoGame,
          addToWatchList: true,
        },
      },
    };

    axios(request)
      .then(() =>
        dispatch(
          addVideoGameToWatchList({ ...videoGame, addToWatchList: true })
        )
      )
      .catch((err) => {
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const removeVideoGameToWatchList = (videoGame) => ({
  type: 'REMOVE_VIDEO_GAME_TO_WATCH_LIST',
  videoGame,
});

export const startRemoveVideoGameToWatchList = (userId, videoGame) => {
  return (dispatch) => {
    const request = {
      method: 'delete',
      url: `/users/${userId}/video-games`,
      data: {
        title: videoGame.name,
      },
    };

    axios(request)
      .then(() => dispatch(removeVideoGameToWatchList(videoGame)))
      .catch((err) => {
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const startUserUpdatePassword = ({
  userId,
  email,
  password,
  newPassword,
}) => {
  return (dispatch) => {
    const request = {
      method: 'put',
      url: `/users/${userId}/password`,
      data: {
        email,
        password,
        newPassword,
      },
    };

    axios(request)
      .then((response) => dispatch(loadSuccess(response.data.message)))
      .catch((err) => {
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};

export const userDelete = () => ({
  type: 'USER_DELETE',
});

export const startUserDelete = (userId) => {
  return (dispatch) => {
    const request = {
      method: 'delete',
      url: `/users/${userId}`,
    };

    axios(request)
      .then(() => {
        dispatch(userDelete());
      })
      .catch((err) => {
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};
