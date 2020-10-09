const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const get = id => tasksRepo.get(id);
const create = user => tasksRepo.create(user);
const update = user => tasksRepo.update(user);
const remove = id => tasksRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
