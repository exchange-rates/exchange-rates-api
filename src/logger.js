import winston from 'winston';
import expressWinston from 'express-winston';

const logOptions = {
  timestamp: () => new Date().toISOString(),
  level: 'info',
  json: true
};


const winstonTransports = [
  new (winston.transports.Console)(logOptions)
];

export const logger = new (winston.Logger)({
  transports: winstonTransports
});

export const expressLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  statusLevels: {
    500: 'error',
    400: 'warn'
  }
});
