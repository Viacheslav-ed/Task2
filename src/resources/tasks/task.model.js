const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  {
    collection: 'tasks'
  }
);

Task.static('toResponse', task => ({
  id: task.id,
  title: task.title,
  order: task.order,
  description: task.description,
  userId: task.userId,
  boardId: task.boardId,
  columnId: task.columnId
}));

module.exports = mongoose.model('task', Task);
