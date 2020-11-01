const User = require('./user.model');
const Task = require('../tasks/task.model');
const bcrypt = require('bcrypt');

const hashedUser = async user => {
  const hashPass = await bcrypt.hash(user.password, 12);
  return { ...user, password: hashPass };
};

const getAll = async () => User.find({});
const get = async id => {
  const user = await User.findById(id);
  if (!user) {
    const err = new Error(`User '${id}' not found`);
    err.status = '404';
    throw err;
  }
  return user;
};
const getByLogin = async login => User.findOne({ login });
const create = async user => User.create(await hashedUser(user));
const update = async (id, user) => {
  await get(id);
  await User.updateOne({ _id: id }, await hashedUser(user));
  return get(id);
};
const remove = async id => {
  await get(id);
  await User.deleteOne({ _id: id });
  const userTasks = await Task.find({ userId: id });
  for (const task of userTasks) {
    await Task.updateOne({ _id: task.id }, { userId: null });
  }
};

module.exports = { getAll, get, create, update, remove, getByLogin };
