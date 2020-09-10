import { startGetFeatureGames } from '../actions/game';

const initialState = {
  featureGames: '',
  categoryGames: '',
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FEATURE_GAMES':
      return {
        ...state,
        featureGames: action.featureGames,
      };
    case 'GET_CATEGORY_GAMES':
      return {
        ...state,
        categoryGames: action.categoryGames,
      };
    default:
      return state;
  }
};

export default gameReducer;
