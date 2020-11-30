import axios from 'axios';
import loadingError from '../utils/loadingError';
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
        const error = loadingError(err);

        dispatch(loadError(error));
      });
  };
};
