const initialState = {
  featureGames: [],
  categoryGames: [],
  moreCategoryGames: [],
  currentGame: {},
  searchResults: [],
  genre: '',
  page: '',
  offset: 0,
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
    case 'SET_MORE_CATEGORY_GAMES':
      return {
        ...state,
        moreCategoryGames: action.categoryGames,
      };
    case 'SET_CURRENT_GAME':
      return {
        ...state,
        currentGame: action.currentGame,
      };
    case 'SET_GENRE':
      return {
        ...state,
        genre: action.genre,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.page,
      };
    case 'SET_OFFSET':
      return {
        ...state,
        offset: action.offset,
      };
    case 'UPDATE_OFFSET':
      return {
        ...state,
        offset: (state.offset += action.update),
      };
    case 'VIDEO_GAME_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.videoGames,
      };
    case 'RESET':
      return {
        ...state,
        featureGames: [],
        categoryGames: [],
        moreCategoryGames: [],
        currentGame: {},
        searchResults: [],
        offset: 0,
      };
    default:
      return state;
  }
};

export default gameReducer;
