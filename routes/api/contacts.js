const express = require("express");

const { validation, controllerWrapper, auth } = require("../../middlewares");
const { joiSchema, statusJoiSchema } = require("../../models/contact");
const { contacts } = require("../../controllers");

const router = express.Router();

router.get("/", auth, controllerWrapper(contacts.listContacts));

router.get("/:contactId", auth, controllerWrapper(contacts.getContactById));

router.post(
  "/",
  auth,
  validation(joiSchema),
  controllerWrapper(contacts.addContact)
);

router.delete("/:contactId", auth, controllerWrapper(contacts.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(contacts.updateContactById)
);
router.patch(
  "/:contactId/favorite",
  validation(statusJoiSchema, "updateStatus"),
  controllerWrapper(contacts.updateStatusContact)
);

module.exports = router;
