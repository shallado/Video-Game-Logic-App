import axios from 'axios';
import { loadTodoSuccess, loadTodoError } from './error';

export const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  userInfo: {
    ...user,
    password: 'passwordP1%',
  },
});

export const removeCurrentUser = () => ({
  type: 'REMOVE_CURRENT_USER',
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
        if (response.status === 200) {
          dispatch(loadTodoSuccess(response.data));
          dispatch(userUpdate({ ...updates }));
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

export const startUploadProfilePhoto = (id, imageFile) => {
  return (dispatch) => {
    axios({
      method: 'put',
      url: `/users/${id}/profilePhoto`,
      data: imageFile,
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadTodoSuccess(response.data));
          dispatch(
            userUpdate({ profilePhoto: response.data.data.profilePhoto })
          );
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
