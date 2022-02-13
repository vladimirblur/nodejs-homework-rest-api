const { BadRequest } = require("http-errors");

const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Verify your email",
    text: `Click on the following link to verify your email http://localhost:3000/users/verify/${user.verificationToken}`,
    html: `<p>Click on the following link to verify your email</p> <a target="_blank" href="http://localhost:3000/users/verify/${user.verificationToken}"'>Confirm email</a>`,
  };

  await sendEmail(mail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
