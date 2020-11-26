const initialState = {
  errorInfo: null,
  successInfo: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_SUCCESS':
      return {
        ...state,
        successInfo: action.successInfo,
      };
    case 'LOAD_ERROR':
      return {
        ...state,
        errorInfo: action.errorInfo,
      };
    case 'HIDE_ERROR':
      return {
        ...state,
        errorInfo: null,
        successInfo: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
