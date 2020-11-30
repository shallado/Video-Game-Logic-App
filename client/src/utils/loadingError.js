const loadingError = (err) => {
  let error;

  if (err.response) {
    error = err.response.data;
  } else if (err.request) {
    error = err.request;
  } else {
    error = err.message;
  }

  return error;
};

export default loadingError;
