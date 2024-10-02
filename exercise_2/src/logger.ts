import * as winston from 'winston';
import chalk from 'chalk';

/**
 * Creates and configures a Winston logger for the application.
 * @returns A configured Winston logger instance.
 */
export function createLogger(): winston.Logger {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    ),
    transports: [
      // new winston.transports.Console({
      //   format: winston.format.combine(
      //     winston.format.colorize(),
      //     winston.format.printf(({ level, message, timestamp }) => {
      //       return `${chalk.gray(timestamp)} ${level}: ${message}`;
      //     })
      //   ),
      // }),
      new winston.transports.File({ filename: 'simulator.log' })
    ]
  });
}