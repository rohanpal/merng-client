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

module.exports.validateCommentInput = (body) => {
  const errors = {}
  if (body.trim() === "") {
    errors.body = "Comment can't be empty"
  }
  return { errors, valid: Object.keys(errors).length < 1 }
}
