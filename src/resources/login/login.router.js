const router = require('express').Router();
const loginService = require('./login.service');
const { asyncHandleError } = require('./../../common/error-handling');
const { logger } = require('../../common/logger');

router.route('/').post(
  asyncHandleError(async (req, res) => {
    const { login, password } = req.body;
    const token = await loginService.signToken(login, password);

    if (!token) {
      logger.error(
        `[Invalid login/password] Login: ${login}, Password: ${password}`
      );
      res.status('403').send('Wrong login or password');
    } else {
      logger.info(`Create token: ${token}`);
      res.json(token);
    }
  })
);

module.exports = router;
