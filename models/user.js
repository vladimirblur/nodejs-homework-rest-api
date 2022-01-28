const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const updateSubcriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const joiVerifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSignupSchema,
  joiLoginSchema,
  updateSubcriptionSchema,
  joiVerifyEmailSchema,
};
