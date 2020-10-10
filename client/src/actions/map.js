import axios from 'axios';
import { loadTodoError, loadTodoSuccess } from './error';

export const startGetMapLocations = () => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: '/map',
    })
      .then((data) => {
        dispatch(loadTodoSuccess(data.data));
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
