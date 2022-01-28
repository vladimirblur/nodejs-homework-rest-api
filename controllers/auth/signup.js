const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email in use`);
  }

  const verificationToken = v4();
  const avatarURL = gravatar.url(email, { s: "200" }, true);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    subscription,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verify your email",
    text: `Click on the following link to verify your email http://localhost:3000/users/verify/${verificationToken}`,
    html: `<p>Click on the following link to verify your email</p> <a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}"'>Confirm email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      subscription: subscription || "starter",
    },
  });
};

module.exports = signup;
