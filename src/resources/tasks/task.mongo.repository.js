const Task = require('./task.model');

const getAll = async () => Task.find({});
const get = async id => {
  const task = await Task.findById(id);
  if (!task) {
    const err = new Error(`Task '${id}' not found`);
    err.status = '404';
    throw err;
  }
  return task;
};
const create = async task => Task.create(task);
const update = async (id, task) => {
  await get(id);
  await Task.updateOne({ _id: id }, task);
  return get(id);
};
const remove = async id => {
  await get(id);
  await Task.deleteOne({ _id: id });
};

module.exports = { getAll, get, create, update, remove };
