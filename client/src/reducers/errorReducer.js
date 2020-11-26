const initialState = {
  errorInfo: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_SUCCESS':
      return {
        ...state,
        errorInfo: null,
      };
    case 'LOAD_ERROR':
      return {
        ...state,
        errorInfo: action.error,
      };
    case 'HIDE_ERROR':
      return {
        ...state,
        errorInfo: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
