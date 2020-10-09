const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  removeTask
} = require('../../common/sources/memory');

const getAll = async () => getAllTasks();
const get = async id => getTask(id);
const create = async user => createTask(user);
const update = async user => updateTask(user);
const remove = async id => removeTask(id);

module.exports = { getAll, get, create, update, remove };
