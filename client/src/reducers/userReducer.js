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
    default:
      return state;
  }
};

export default userReducer;
