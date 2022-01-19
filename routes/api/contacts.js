const express = require("express");

const { validation, controllerWrapper } = require("../../middlewares");
const { joiSchema, statusJoiSchema } = require("../../models/contact");
const { contacts } = require("../../controllers");

const router = express.Router();

router.get("/", controllerWrapper(contacts.listContacts));

router.get("/:contactId", controllerWrapper(contacts.getContactById));

router.post("/", validation(joiSchema), controllerWrapper(contacts.addContact));

router.delete("/:contactId", controllerWrapper(contacts.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(contacts.updateContactById)
);
router.patch(
  "/:contactId/favorite",
  validation(statusJoiSchema),
  controllerWrapper(contacts.updateStatusContact)
);

module.exports = router;
