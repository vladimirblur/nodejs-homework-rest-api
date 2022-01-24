const express = require("express");

const { validation, controllerWrapper, auth } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiSignupSchema, joiLoginSchema } = require("../../models/user");

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

module.exports = router;
