const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: String,
    login: String,
    password: String
  },
  {
    collection: 'users'
  }
);

User.static('toResponse', user => ({
  id: user.id,
  name: user.name,
  login: user.login
}));

module.exports = mongoose.model('user', User);
