// model created to handle custom errors
class APIError extends Error {
  constructor(name, httpStatus = 500, description) {
    super();
    this.name = name;
    this.httpStatus = httpStatus;
    this.description = description;
  }
}

module.exports = APIError;
