const throwNotFoundError = (message) => {
  const error = new Error(message);
  error.name = 'NotFoundError';
  throw error;
};

const throwBadRequestError = (message) => {
  const error = new Error(message);
  error.name = 'BadRequest';
  throw error;
};

const throwUnprocessableEntity = (message) => {
  const error = new Error(message);
  error.name = 'Unprocessable Entity';
  throw error;
};

module.exports = {
  throwNotFoundError,
  throwBadRequestError,
  throwUnprocessableEntity,
};