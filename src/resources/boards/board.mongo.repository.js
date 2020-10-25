const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = async () => Board.find({});
const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    const err = new Error(`Board '${id}' not found`);
    err.status = '404';
    throw err;
  }
  return board;
};
const create = async board => Board.create(board);
const update = async (id, board) => {
  await get(id);
  await Board.updateOne({ _id: id }, board);
  return get(id);
};
const remove = async id => {
  await get(id);
  await Board.deleteOne({ _id: id });
  const boardTasks = await Task.find({ boardId: id });
  for (const task of boardTasks) {
    await Task.deleteOne({ _id: task.id });
  }
};

module.exports = { getAll, get, create, update, remove };
