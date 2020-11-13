module.exports.validateRegisterInputs = (username, password, confirmPassword, email) => {
  const errors = {}
  if (username.trim() === "") {
    errors.username = "Username is required"
  }
  if (password === "") {
    errors.password = "Password is required"
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords does not match"
  }
  if (email.trim() === "") {
    errors.email = "Email is required"
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    errors.email = "Email not in correct format"
  }
  return { errors, valid: Object.keys(errors).length < 1 }
}

module.exports.validateLoginInputs = (username, password) => {
  const errors = {}
  if (username.trim() === "") {
    errors.username = "Username is required"
  }
  if (password === "") {
    errors.password = "Password is required"
  }
  return { errors, valid: Object.keys(errors).length < 1 }
}
const requiredError = "This field is required"
module.exports.validateCommentInput = (body) => {
  const errors = {}
  if (body.trim() === "") {
    errors.body = "Comment can't be empty"
  }
  return { errors, valid: Object.keys(errors).length < 1 }
}

module.exports.validateUpdateProfile = (address) => {
  const errors = {}
  if (address && Object.keys(address).length) {
    const { addressLine1, addressLine2, city, state, zipCode } = address
    if (!addressLine1.trim()) {
      errors.addressLine1 = requiredError
    }
    if (!city.trim()) {
      errors.city = requiredError
    }
    if (!state.trim()) {
      errors.state = requiredError
    }
    if (!zipCode) {
      errors.zipCode = requiredError
    }
  }
  return { errors, valid: Object.keys(errors).length < 1 }
}
