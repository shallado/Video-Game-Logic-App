const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...action.userInfo,
      };
    case 'REMOVE_CURRENT_USER':
      return {};
    case 'USER_UPDATE':
      return {
        ...state,
        ...action.updates,
      };
    case 'ADD_VIDEO_GAME_TO_WATCH_LIST':
      return {
        ...state,
        videoGames: [...state.videoGames, action.videoGame],
      };
    case 'REMOVE_VIDEO_GAME_TO_WATCH_LIST':
      return {
        ...state,
        videoGames: state.videoGames.filter(
          (videoGame) => action.videoGame.name !== videoGame.name
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
