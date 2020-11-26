export const loadSuccess = () => ({
  type: 'LOAD_SUCCESS',
});

export const loadError = (error) => ({
  type: 'LOAD_ERROR',
  error,
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  error,
});

export const hideError = () => ({
  type: 'HIDE_ERROR',
});
