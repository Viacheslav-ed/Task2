const usersRepo = require('../users/user.mongo.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const signToken = async (login, password) => {
  const user = await usersRepo.getByLogin(login);

  if (!user) {
    return null;
  }
  const { _id: id, password: userPassword } = user;
  if (password !== userPassword) {
    return null;
  }
  return jwt.sign({ id, login }, JWT_SECRET_KEY);
};

module.exports = { signToken };
