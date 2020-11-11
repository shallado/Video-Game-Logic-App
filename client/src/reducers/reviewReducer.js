const initialState = {
  userReviews: [],
  videoGameReviews: {
    videoGameId: 0,
    title: '',
    reviews: [],
  },
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_VIDEO_GAME_REVIEWS':
      return {
        ...state,
        userReviews: [...action.reviews],
      };
    case 'EDIT_VIDEO_GAME_REVIEW':
      return {
        ...state,
        videoGameReviews: {
          ...state.videoGameReviews,
          reviews: state.videoGameReviews.reviews.map((review) => {
            if (review.username === action.username) {
              return {
                ...review,
                review: action.review,
              };
            } else {
              return review;
            }
          }),
        },
      };
    case 'ADD_VIDEO_GAME_REVIEW':
      return {
        ...state,
        videoGameReviews: {
          ...state.videoGameReviews,
          reviews: [action.userReview, ...state.videoGameReviews.reviews],
        },
      };
    case 'SET_VIDEO_GAME_REVIEWS':
      return {
        ...state,
        videoGameReviews: {
          ...state.videoGameReviews,
          videoGameId: action.reviews._id,
          title: action.reviews.title,
          reviews: action.reviews.videoGameReviews,
        },
      };
    case 'RESET_VIDEO_GAME_REVIEWS':
      return {
        ...state,
        videoGameReviews: initialState.videoGameReviews,
      };
    default:
      return state;
  }
};

export default reviewReducer;
