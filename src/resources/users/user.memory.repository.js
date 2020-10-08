const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser
} = require('../../common/sources/memory');

const getAll = async () => getAllUsers();
const get = async id => getUser(id);
const create = async user => createUser(user);
const update = async user => updateUser(user);
const remove = async id => removeUser(id);

module.exports = { getAll, get, create, update, remove };
