const { StatusCodes: HTTP } = require('http-status-codes');

const errorHandlerMiddleware = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'NotFoundError': res.status(HTTP.NOT_FOUND).json({ message }); break;
    case 'BadRequest': res.status(HTTP.BAD_REQUEST).json({ message }); break;
    case 'Unprocessable Entity': res.status(HTTP.UNPROCESSABLE_ENTITY).json({ message }); break;
    default: res.sendStatus(HTTP.INTERNAL_SERVER_ERROR);
  }
};

module.exports = errorHandlerMiddleware;