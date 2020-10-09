const {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard
} = require('../../common/sources/memory');

const getAll = async () => getAllBoards();
const get = async id => getBoard(id);
const create = async user => createBoard(user);
const update = async user => updateBoard(user);
const remove = async id => removeBoard(id);

module.exports = { getAll, get, create, update, remove };
