const initialState = {
  userId: undefined,
  loggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        userId: action.userId,
        loggedIn: true,
      };
    case 'SIGN_OUT':
      return {
        userId: undefined,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
