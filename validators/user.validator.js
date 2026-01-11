function validateCreateUser({ name, email }) {
  if (!name || typeof name !== "string") {
    return "Invalid name";
  }

  if (!email || !email.includes("@")) {
    return "Invalid email";
  }

  return null;
}

module.exports = { validateCreateUser };
