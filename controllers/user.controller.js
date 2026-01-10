const userService = require("../services/user.service");

exports.getAllUsers = (req, res) => {
  const users = userService.getAll();
  res.json(users);
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "name and email required" });
  }

  const user = userService.create({ name, email });

  res.status(201).json(user);
};

exports.getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = userService.getById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

exports.remove = (id) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  saveUsers();
  return true;
};

exports.deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const deleted = userService.remove(id);

  if (!deleted) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(204).send();
};
