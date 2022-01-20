const { BadRequest } = require("http-errors");

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const { favorite } = req.body;

    if (Object.keys(req.body).length === 0) {
      throw new BadRequest(`missing fields`);
    }

    if (error) {
      error.status = 400;

      if (!favorite) {
        error.message = "missing field favorite";
      }

      next(error);
    }
    next();
  };
};

module.exports = validation;
