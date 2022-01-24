const { BadRequest } = require("http-errors");

const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  if (isNaN(skip)) {
    throw new BadRequest(
      `Invalid request parameters, page and limit must be a number`
    );
  }

  const query = {};
  if (favorite) {
    query.favorite = favorite;
  }

  const contacts = await Contact.find({ owner: _id, ...query }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
