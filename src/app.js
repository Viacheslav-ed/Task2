const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { useLogger, logger } = require('./common/logger');
const { useErrorHandling } = require('./common/error-handling');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const checkAuthorization = require('./common/check-authorization');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const exit = process.exit;

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(useLogger);

app.use('/login', loginRouter);

app.use(checkAuthorization);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(useErrorHandling);

process.on('unhandledRejection', reason => {
  console.log(reason.stack);
  logger.error(
    `[UnhandledRejection error] Message: ${reason.message}, Stack: ${reason.stack}`
  );
  exit(1);
});

process.on('uncaughtException', error => {
  console.log(error.stack);
  logger.error(
    `[UncaughtException error] Message: ${error.message}, Stack: ${error.stack}`
  );
  exit(1);
});

module.exports = app;
