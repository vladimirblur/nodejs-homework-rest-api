const fs = require("fs/promises");
const contactsPath = require("./filePath");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

module.exports = updateContacts;
