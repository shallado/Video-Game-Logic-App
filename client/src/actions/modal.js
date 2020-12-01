export const showModal = (modalType) => ({
  type: 'SHOW_MODAL',
  modalType,
});

export const hideModal = (modalType) => ({
  type: 'HIDE_MODAL',
  modalType,
});

export const setWindowOffset = (windowOffset) => ({
  type: 'SET_WINDOW_OFFSET',
  windowOffset,
});

export const resetWindowOffset = () => ({
  type: 'RESET_WINDOW_OFFSET',
});
