const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const regexprs = require("../../common/regexprs");
const config = require("../../config");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    validate: {
      validator: validator.isAlphanumeric,
      message: (props) =>
        `${props.value} is not a valid nickname, letters and numbers are only allowed`,
    },
    required: [true, "nickname is required"],
    trim: true,
    alias: "nickname",
  },
  name: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: (props) => `Invalid email format: ${props.value}`,
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
      message: (props) =>
        `Invalid date format: ${props.value}, sample date: 30-11-1990`,
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

userSchema
  .set("toJSON", { getters: true, virtuals: true })
  .set("toObject", { getters: true, virtuals: true });

userSchema.pre("validate", function (next) {
  if (this.isModified("created")) {
    throw "created is read only!";
  } else {
    return next();
  }
});

userSchema.pre("save", function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // Generate a salt and hash the password
  bcrypt.hash(this.password, config.SALT_WORK_FACTOR, (err, hash) => {
    // Store hash in your password DB.
    this.password = hash;
    return next();
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
