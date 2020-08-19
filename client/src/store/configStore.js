import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import errorReducer from '../reducers/errorReducer';

const configStore = () => {
  const rootReducer = combineReducers({
    user: userReducer,
    error: errorReducer,
  });
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};

export default configStore;
