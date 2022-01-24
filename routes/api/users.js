const express = require("express");

const {
  auth,
  upload,
  controllerWrapper,
  validation,
} = require("../../middlewares");
const { user: ctrl } = require("../../controllers");
const { updateSubcriptionSchema } = require("../../models/user");

const router = express.Router();

router.get("/current", auth, controllerWrapper(ctrl.getCurrentUser));

router.patch(
  "/",
  auth,
  validation(updateSubcriptionSchema),
  controllerWrapper(ctrl.updateSubcription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
);

module.exports = router;
