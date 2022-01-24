const { NotFound } = require("http-errors");

const { User } = require("../../models");

const updateSubcription = async (req, res) => {
  const { _id, email } = req.user;

  const { subscription: updatedSubscription } = req.body;

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription: updatedSubscription },
    {
      new: true,
    }
  );

  if (!user) {
    throw new NotFound(`Contact with id=${_id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      user: { email, subscription: user.subscription },
    },
  });
};

module.exports = updateSubcription;
