const { Contact } = require("../../models");
const { BadRequest } = require("http-errors");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  if (Object.keys(req.body).length === 0) {
    throw new BadRequest(`missing fields`);
  }

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
