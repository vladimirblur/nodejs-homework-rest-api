const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      if (Object.keys(req.body).length === 0) {
        error.message = "missing fields";
      }

      next(error);
    }
    next();
  };
};

module.exports = validation;
