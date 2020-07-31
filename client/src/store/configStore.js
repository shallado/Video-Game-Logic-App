import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';

const configStore = () => {
  const rootReducer = combineReducers({ user: userReducer });
  const store = createStore(rootReducer);

  return store;
};

export default configStore;
