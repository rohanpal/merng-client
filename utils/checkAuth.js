const { AuthenticationError } = require("apollo-server")
const jwt = require("jsonwebtoken")
const { SUPER_SECRET_KEY } = require("../config")

module.exports = (context) => {
  const authHeader = context.req.headers.authorization
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1]
    if (token) {
      try {
        const user = jwt.verify(token, SUPER_SECRET_KEY)
        return user
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired token")
      }
    }
    throw new Error("Invalid token format")
  }
  throw new Error("Token not provided")
}
