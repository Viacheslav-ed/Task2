const { logger } = require('./logger');

const useErrorHandling = (err, req, res, next) => {
  if (err.status === '404') {
    logger.info(`Not found: ${err.message}`);
    res.status(404).send(err.message);
  } else {
    logger.error(`[Error 500] Message: ${err.message}, Stack: ${err.stack}`);
    res.sendStatus(500);
  }
  next();
};

const asyncHandleError = callback => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (err) {
    return next(err);
  }
};

module.exports = { useErrorHandling, asyncHandleError };
