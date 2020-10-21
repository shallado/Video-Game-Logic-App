const initialState = {
  loggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        loggedIn: true,
      };
    default:
      return state;
  }
};

export default authReducer;
