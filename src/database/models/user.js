const validator = require("validator");
const mongoose = require("mongoose");
const regexprs = require("../../common/regexprs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
  },
  nickname: {
    type: String,
    validate: {
      validator: validator.isAlphanumeric,
      message: (props) =>
        `${props.value} is not a valid nickname, letters and numbers are only allowed`,
    },
    required: [true, "nickname is required"],
    trim: true,
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: () => `Invalid email format`,
    },
    required: [true, "email is required"],
    index: { unique: true },
    lowercase: true,
    trim: true,
  },
  birthDate: {
    type: String,
    validate: {
      validator: function (birthDate) {
        return validator.matches(birthDate, regexprs.date);
      },
    },
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", "not specified"],
    default: "not specified",
  },
  description: String,
  location: String,
  avatar: String,
  website: String,
  password: {
    type: String,
    required: [true, "must enter a password"],
    select: false,
  },
  created: {
    type: Number,
    default: new Date().getTime(),
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
