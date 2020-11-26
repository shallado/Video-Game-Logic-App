import axios from 'axios';
import { loadError } from './error';

const setMapLocations = (locationsInfo) => ({
  type: 'SET_MAP_LOCATIONS',
  locationsInfo,
});

export const startSetMapLocations = () => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: '/map',
    })
      .then((data) => {
        const locationsInfo = data.data;

        dispatch(setMapLocations(locationsInfo));
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

        dispatch(loadError(error));
      });
  };
};
