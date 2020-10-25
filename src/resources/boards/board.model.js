const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema(
  {
    title: String,
    columns: Array
  },
  {
    collection: 'boards'
  }
);

Board.static('toResponse', board => ({
  id: board.id,
  title: board.title,
  columns: board.columns
}));

module.exports = mongoose.model('board', Board);
