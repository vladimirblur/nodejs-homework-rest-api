const fs = require("fs/promises");

const contactsPath = require("./filePath");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

module.exports = listContacts;
