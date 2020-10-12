const initialState = {
  featureGames: '',
  categoryGames: '',
  currentGame: {},
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
    case 'SET_CURRENT_GAME':
      return {
        ...state,
        currentGame: action.currentGame,
      };
    default:
      return state;
  }
};

export default gameReducer;
