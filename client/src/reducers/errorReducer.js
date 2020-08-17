const initialState = {
  errorInfo: null,
  isOpen: false,
};

const errorReducer = (state = initialState, action) => {
  const { error } = action;

  if (error) {
    return {
      errorInfo: error,
      isOpen: true,
    };
  } else if (action.type === 'HIDE_ERROR') {
    return {
      errorInfo: error,
      isOpen: false,
    };
  }

  return state;
};

export default errorReducer;
