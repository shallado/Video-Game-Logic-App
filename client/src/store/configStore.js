import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import gameReducer from '../reducers/gameReducer';
import errorReducer from '../reducers/errorReducer';
import mapReducer from '../reducers/mapReducer';
import modalReducer from '../reducers/modalReducer';
import reviewReducer from '../reducers/reviewReducer';
import userReducer from '../reducers/userReducer';

const configStore = () => {
  const appReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    game: gameReducer,
    review: reviewReducer,
    user: userReducer,
    map: mapReducer,
    modals: modalReducer,
  });
  const rootReducer = (state, action) => {
    if (action.type === 'SIGN_OUT') {
      state = undefined;
    }

    return appReducer(state, action);
  };
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['error'],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configStore;
