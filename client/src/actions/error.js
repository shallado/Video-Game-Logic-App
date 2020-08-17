export const loadTodoSuccess = (data) => ({
  type: 'GET_TODO_SUCCESS',
  data,
  error: null,
});

export const loadTodoError = (error) => ({
  type: 'GET_TODO_SUCCESS',
  data: null,
  error,
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  error,
});

export const hideError = () => ({
  type: 'HIDE_ERROR',
});
