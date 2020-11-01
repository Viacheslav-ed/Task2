const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');
const { logger } = require('./logger');

const checkAuthorization = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const send401 = () => res.status(401).send('Unauthorized user!');
  const logTokenError = e =>
    logger.error(`[JWT error] Message: ${e.message}, Stack: ${e.stack}`);
  const logHeaderError = () =>
    logger.error('[Request header error] Wrong request header');

  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      send401();
      logHeaderError();
    } else {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
      } catch (error) {
        send401();
        logTokenError(error);
      }
      return next();
    }
  }
  logHeaderError();
  send401();
};

module.exports = checkAuthorization;
