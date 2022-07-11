const runSchema = (schema) => async (value) => {
  const result = await schema.validateAsync(value);
  return result;
};

const throwNotFoundError = (message) => {
  const error = new Error(message);
  error.name = 'NotFoundError';
  throw error;
};

module.exports = {
  runSchema,
  throwNotFoundError,
};