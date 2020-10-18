const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `${__dirname}/../logs/error.log`,
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: `${__dirname}/../logs/info.log`,
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

morgan.token(
  'fullUrl',
  req => `Url: ${req.protocol}://${req.headers.host}${req.originalUrl}`
);
morgan.token('params', req => `Query parameters: ${JSON.stringify(req.query)}`);
morgan.token('body', req => `Body: ${JSON.stringify(req.body)}`);

const stream = {
  write: message => logger.info(message)
};

const useLogger = morgan(':fullUrl, :params, :body', { stream });

module.exports = { useLogger, logger };
