let users = [];
let tasks = [];
let boards = [];

const _checkUser = id => {
  if (!users.some(user => user.id === id)) {
    const err = new Error(`User '${id}' not found`);
    err.status = '404';
    throw err;
  }
};

const getAllUsers = () => users.slice(0);
const getUser = id => {
  _checkUser(id);
  return users.find(user => user.id === id);
};
const createUser = user => {
  users.push(user);
  return user;
};
const updateUser = newUser => {
  _checkUser(newUser.id);
  users[users.findIndex(user => user.id === newUser.id)] = newUser;
  return newUser;
};
const removeUser = id => {
  _checkUser(id);
  users = users.filter(user => user.id !== id);
  tasks = tasks.map(task =>
    task.userId === id ? { ...task, userId: null } : task
  );
};

const _checkTask = id => {
  if (!tasks.some(task => task.id === id)) {
    const err = new Error(`Task '${id}' not found`);
    err.status = '404';
    throw err;
  }
};

const getAllTasks = () => tasks.slice(0);
const getTask = id => {
  _checkTask(id);
  return tasks.find(task => task.id === id);
};
const createTask = task => {
  tasks.push(task);
  return task;
};
const updateTask = newTask => {
  _checkTask(newTask.id);
  tasks[tasks.findIndex(task => task.id === newTask.id)] = newTask;
  return newTask;
};
const removeTask = id => {
  _checkTask(id);
  tasks = tasks.filter(task => task.id !== id);
};

const _checkBoard = id => {
  if (!boards.some(board => board.id === id)) {
    const err = new Error(`Board '${id}' not found`);
    err.status = '404';
    throw err;
  }
};

const getAllBoards = () => boards.slice(0);
const getBoard = id => {
  _checkBoard(id);
  return boards.find(board => board.id === id);
};
const createBoard = board => {
  boards.push(board);
  return board;
};
const updateBoard = newBoard => {
  _checkBoard(newBoard.id);
  boards[boards.findIndex(board => board.id === newBoard.id)] = newBoard;
  return newBoard;
};
const removeBoard = id => {
  _checkBoard(id);
  boards = boards.filter(board => board.id !== id);
  tasks = tasks.filter(task => task.boardId !== id);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  removeTask,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard
};
