const User = require("../../models/User")
const jwt = require("jsonwebtoken")
const { UserInputError } = require("apollo-server")
const bcrypt = require("bcryptjs")
const { SUPER_SECRET_KEY } = require("../../config")
const { validateRegisterInputs, validateLoginInputs, validateUpdateProfile } = require("../../utils/validators")
const checkAuth = require("../../utils/checkAuth")

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    },
    SUPER_SECRET_KEY,
    { expiresIn: "24h" }
  )
}

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, password, confirmPassword, email } }) {
      const { errors, valid } = validateRegisterInputs(username, password, confirmPassword, email)
      if (!valid) {
        throw new UserInputError("Params error", { errors })
      }
      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError("Username taken", { errors: { username: "Username already exists" } })
      }
      password = await bcrypt.hash(password, 12)
      const createdAt = new Date().toISOString()
      const newUser = new User({
        username,
        password,
        confirmPassword,
        email,
        createdAt,
      })
      const res = await newUser.save()
      const token = generateToken(res)
      return { ...res._doc, id: res._id, token }
    },
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInputs(username, password)
      if (!valid) {
        throw new UserInputError("Params error", { errors })
      }
      const user = await User.findOne({ username })
      if (!user) {
        errors.general = "User not found"
        throw new UserInputError("Errors", { errors })
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = "Wrong credentials"
        throw new UserInputError("Errors", { errors })
      }
      return { ...user._doc, id: user._id, token: generateToken(user) }
    },
    async updateProfile(_, { dateOfBirth = "", about = "", profilePicture = "", address }, context) {
      const { username } = checkAuth(context)
      const { errors, valid } = validateUpdateProfile(address)
      if (!valid) {
        throw new UserInputError("Params error", { errors })
      }
      if (!address) {
        address = {
          addressLine1: "",
          addressLine2: "",
          city: "",
          zipCode: "",
          state: "",
        }
      }
      try {
        const user = await User.findOneAndUpdate({ username }, { dateOfBirth, about, profilePicture, address }, { new: true })
        if (!user) {
          throw new UserInputError("User not found")
        }
        const userDetails = await user.save()
        console.log(userDetails)
        return userDetails
      } catch (error) {
        throw new UserInputError("Params error", { errors })
      }
    },
  },
}
