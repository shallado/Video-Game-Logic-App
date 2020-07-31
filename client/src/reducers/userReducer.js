const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_SIGN_UP':
      return {
        ...state,
        ...action.userInfo,
      };
    default:
      return state;
  }
};

export default userReducer;
