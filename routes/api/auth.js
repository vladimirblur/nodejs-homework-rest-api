const express = require("express");

const { validation, controllerWrapper, auth } = require("../../middlewares");
const { auth: ctrl, user } = require("../../controllers");
const {
  joiSignupSchema,
  joiLoginSchema,
  updateSubcriptionSchema,
} = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(joiSignupSchema, "auth"),
  controllerWrapper(ctrl.signup)
);

router.post(
  "/login",
  validation(joiLoginSchema, "auth"),
  controllerWrapper(ctrl.login)
);

router.get("/logout", auth, controllerWrapper(ctrl.logout));

router.get("/current", auth, controllerWrapper(user.getCurrentUser));

router.patch(
  "/",
  auth,
  validation(updateSubcriptionSchema),
  controllerWrapper(user.updateSubcription)
);

module.exports = router;
