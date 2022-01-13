const express = require("express");

const { validation, controllerWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts } = require("../../controllers");

const router = express.Router();

router.get("/", controllerWrapper(contacts.listContacts));

router.get("/:contactId", controllerWrapper(contacts.getContactById));

router.post(
  "/",
  validation(contactSchema),
  controllerWrapper(contacts.addContact)
);

router.delete("/:contactId", controllerWrapper(contacts.removeContact));

router.put(
  "/:contactId",
  validation(contactSchema),
  controllerWrapper(contacts.updateContactById)
);

module.exports = router;
