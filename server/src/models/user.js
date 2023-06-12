import mongoose from "mongoose";
import modelOptions from "./model.js";
import crypto from "crypto";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  salt: {
    type: String,
    required: true,
    select: false
  }
}, modelOptions);

userSchema.methods.setPassword = function (password) {    //Κρυπτογράφηση και αποθήκευση του password που δίνεται από τον χρήστη στο πεδίο password
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    "sha512"
  ).toString("hex");
};

userSchema.methods.validPassword = function (password) {    //Έλεγχος εγκυρότητας του password (αν το αποθηκευμένο password ταιριάζει με το password που εισάγει ο χρήστης)
  const hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    "sha512"
  ).toString("hex");

  return this.password === hash;
};

const userModel = mongoose.model("User", userSchema);
export default userModel;