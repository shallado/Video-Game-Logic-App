export const showModal = (modalType) => ({
  type: 'SHOW_MODAL',
  modalType,
});

export const hideModal = (modalType) => ({
  type: 'HIDE_MODAL',
  modalType,
});
