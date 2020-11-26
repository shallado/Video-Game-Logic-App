export const loadSuccess = (successInfo) => ({
  type: 'LOAD_SUCCESS',
  successInfo,
});

export const loadError = (errorInfo) => ({
  type: 'LOAD_ERROR',
  errorInfo,
});

export const setError = (errorInfo) => ({
  type: 'SET_ERROR',
  errorInfo,
});

export const hideError = () => ({
  type: 'HIDE_ERROR',
});
