const User = require('./user.model');

const getAll = async () => User.find({});
const get = async id => User.findById(id);
const create = async user => User.create(user);
const update = async (id, user) => {
  await User.updateOne({ _id: id }, user);
  return get(id);
};
const remove = async id => User.deleteOne({ _id: id });

module.exports = { getAll, get, create, update, remove };
