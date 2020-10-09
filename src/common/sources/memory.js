const User = require('../../resources/users/user.model');
const Task = require('../../resources/tasks/task.model');

let users = [];
let tasks = [];

users.push(new User(), new User(), new User());
tasks.push(new Task(), new Task(), new Task());

const getAllUsers = () => users.slice(0);
const getUser = id => users.find(user => user.id === id);
const createUser = user => {
  users.push(user);
  return user;
};
const updateUser = newUser => {
  users[users.findIndex(user => user.id === newUser.id)] = newUser;
  return newUser;
};
const removeUser = id => {
  users = users.filter(user => user.id !== id);
};

const getAllTasks = () => tasks.slice(0);
const getTask = id => tasks.find(task => task.id === id);
const createTask = task => {
  tasks.push(task);
  return task;
};
const updateTask = newTask => {
  tasks[tasks.findIndex(task => task.id === newTask.id)] = newTask;
  return newTask;
};
const removeTask = id => {
  tasks = tasks.filter(task => task.id !== id);
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
  removeTask
};
