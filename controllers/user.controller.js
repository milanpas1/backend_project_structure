const userService = require("../services/user.service");

async function createUser(req, res, next) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "name and email required" });
    }

    const user = await userService.createUser({ name, email });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  getUsers,
};
