const initialState = {
  featureGames: [],
  categoryGames: [],
  currentGame: {},
  searchResults: [],
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
        categoryGames: [...state.categoryGames, ...action.categoryGames],
      };
    case 'UPDATE_CATEGORY_GAMES':
      return {
        ...state,
        categoryGames: state.categoryGames.map((category, index) => {
          if (index === action.categoryIndex) {
            return [...category, ...action.updateGames[0]];
          }

          return category;
        }),
      };
    case 'SET_CURRENT_GAME':
      return {
        ...state,
        currentGame: action.currentGame,
      };
    case 'VIDEO_GAME_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.videoGames,
      };
    case 'RESET_GAMES':
      return initialState;
    default:
      return state;
  }
};

export default gameReducer;
