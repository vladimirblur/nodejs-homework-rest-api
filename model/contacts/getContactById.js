const listContacts = require("./listContacts");

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

module.exports = getContactById;
