const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const regexprs = require("../../common/regexprs");
const config = require("../../config");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return this.nickname;
    },
  },
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
    index: { unique: true },
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

userSchema.pre("validate", function (next) {
  if (this.isModified("created")) {
    throw "created is read only!";
  } else {
    next();
  }
});

userSchema.pre("save", function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // Generate a salt and hash the password
  bcrypt.hash(this.password, config.SALT_WORK_FACTOR, (err, hash) => {
    // Store hash in your password DB.
    this.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
