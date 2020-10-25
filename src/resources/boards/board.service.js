const boardsRepo = require('./board.mongo.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const create = user => boardsRepo.create(user);
const update = (id, user) => boardsRepo.update(id, user);
const remove = id => boardsRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
