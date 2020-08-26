const initialState = {
  errorInfo: null,
  isOpen: false,
};

const errorReducer = (state = initialState, action) => {
  const { error, data } = action;

  if (error) {
    return {
      errorInfo: error,
      isOpen: true,
    };
  } else if (action.type === 'HIDE_ERROR') {
    return {
      isOpen: false,
    };
  } else if (data) {
    return {
      isOpen: true,
    };
  }

  return state;
};

export default errorReducer;
