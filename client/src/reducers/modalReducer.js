const initialState = [];

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return [...state, action.modalType];
    case 'HIDE_MODAL':
      return state.filter((modalType) => modalType !== action.modalType);
    default:
      return state;
  }
};

export default modalReducer;
