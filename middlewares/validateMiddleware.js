const Joi = require('joi');
const {
  throwBadRequestError, throwUnprocessableEntity, throwNotFoundError,
} = require('../services/utils');

const validateBodyAdd = (req, res, next) => {
  const schema = Joi.object({
  name: Joi.string().required().min(5),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    switch (error.details[0].type) {
      case 'any.required':
        throwBadRequestError(error.message);
        break;
      case 'string.min':
        throwUnprocessableEntity(error.message);
        break;
      default:
        throw new Error();
    }
  }
  next();
};

const validateParamsId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().required().positive().integer(),
  });
  const { error } = schema.validate(req.params);
  if (error) throwNotFoundError(error.message);
  next();
};

module.exports = {
  validateBodyAdd,
  validateParamsId,
};
