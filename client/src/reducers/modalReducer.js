const initialState = {
  windowOffset: 0,
  openModals: [],
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        openModals: [...state.openModals, action.modalType],
      };
    case 'HIDE_MODAL':
      return {
        ...state,
        openModals: state.openModals.filter(
          (modalType) => modalType !== action.modalType
        ),
      };
    case 'SET_WINDOW_OFFSET':
      return {
        ...state,
        windowOffset: action.windowOffset,
      };
    case 'RESET_WINDOW_OFFSET':
      return {
        ...state,
        windowOffset: 0,
      };
    default:
      return state;
  }
};

export default modalReducer;
