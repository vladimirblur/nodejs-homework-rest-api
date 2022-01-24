const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const { imageHandler } = require("../../middlewares");
// const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const { _id: id } = req.user;
  await imageHandler(tempPath);

  const imageName = `${id}_${originalname}`;

  try {
    const resultPath = path.join(avatarsDir, imageName);
    await fs.rename(tempPath, resultPath);
    const avatarURL = path.join("avatars", imageName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempPath);

    throw error;
  }
};

module.exports = updateAvatar;
