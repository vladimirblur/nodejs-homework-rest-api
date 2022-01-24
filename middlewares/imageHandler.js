const Jimp = require("jimp");

const imageHandler = async (image) => {
  const processedImage = await Jimp.read(image);
  try {
    return processedImage.resize(250, 250).quality(75).write(image);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = imageHandler;
