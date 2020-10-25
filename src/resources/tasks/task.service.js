const tasksRepo = require('./task.mongo.repository');

const getAll = () => tasksRepo.getAll();
const get = id => tasksRepo.get(id);
const create = user => tasksRepo.create(user);
const update = (id, user) => tasksRepo.update(id, user);
const remove = id => tasksRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
