const { BadRequest } = require("http-errors");

const validation = (schema, action) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (Object.keys(req.body).length === 0) {
      switch (action) {
        case "auth":
          throw new BadRequest("Ошибка от Joi или другой библиотеки валидации");

        case "updateStatus":
          throw new BadRequest(`missing field favorite`);

        case "verifyEmail":
          throw new BadRequest("missing required field email");

        default:
          throw new BadRequest(`missing fields`);
      }
    }

    if (error) {
      error.status = 400;

      next(error);
    }
    next();
  };
};

module.exports = validation;
