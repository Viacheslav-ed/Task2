const User = require('../../resources/users/user.model');

let users = [];

users.push(new User(), new User(), new User());

const getAllUsers = () => users.slice(0);
const getUser = id => users.find(user => user.id === id);
const createUser = user => {
  users.push(user);
  return user;
};
const updateUser = newUser => {
  users[users.findIndex(user => user.id === newUser.id)] = newUser;
  return newUser;
};
const removeUser = id => {
  users = users.filter(user => user.id !== id);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser
};
