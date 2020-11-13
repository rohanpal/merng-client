const { Schema, model } = require("mongoose")

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  dateOfBirth: { type: String, default: "" },
  about: { type: String, default: "" },
  address: {
    addressLine1: { type: String, default: "" },
    addressLine1: { type: String },
    city: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    state: { type: String, default: "" },
  },
})

module.exports = model("Users", userSchema)
