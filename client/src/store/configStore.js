import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import errorReducer from '../reducers/errorReducer';
import userReducer from '../reducers/userReducer';
import { loadState } from '../utils/localStorage';

const configStore = () => {
  const persistedState = loadState();
  const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    user: userReducer,
  });
  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};

export default configStore;
