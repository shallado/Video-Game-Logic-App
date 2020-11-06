const initialState = {
  userReviews: [],
  videoGameReviews: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_REVIEWS':
      return {
        ...state,
        userReviews: [...action.reviews],
      };
    case 'SET_VIDEO_GAME_REVIEWS':
      return {
        ...state,
        videoGameReviews: action.reviews.videoGameReviews,
      };
    default:
      return state;
  }
};

export default reviewReducer;
