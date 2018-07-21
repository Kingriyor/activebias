/**
 * Created by EMEHINOLA Idowu on 19/06/2018.
 * objective: building to scale
 */
const morgan = require('morgan');
const config = require('../config/config');
const serviceLocator = require('../lib/serviceLocator');
const winston = require('winston');
const rabbit = require('amqplib');
const bluebird = require('bluebird');
const mongoose = require('mongoose');
const activeBiasController = require('../controllers/activeBiasController');
const activeBiasService = require('../services/activeBiasService');

mongoose.Promise = bluebird;

/**
 * Returns an instance of logger for the App
 */

serviceLocator.register('logger', () => {
  const consoleTransport = new (winston.transports.Console)({
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    json: false,
    colorize: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info',
  });
  const transports = [consoleTransport];
  const winstonLogger = new (winston.Logger)({
    transports,
  });
  return winstonLogger;
});

/**
 * Returns a RabbitMQ connection instance.
 */
serviceLocator.register('rabbitmq', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const connectionString = `amqp://${config.rabbit_mq.user}:${config.rabbit_mq.pass}@${config.rabbit_mq.host}:${config.rabbit_mq.port}`;

  return rabbit.connect(connectionString, (err, connection) => new Promise((resolve, reject) => {
    // If the connection throws an error
    if (err) {
      logger.error(`RabbitMQ connection error: ${err}`);
      return reject(err);
    }

    connection.on('error', (connectionError) => {
      logger.error(`RabbitMQ connection error: ${connectionError}`);
      process.exit(1);
    });

    connection.on('blocked', (reason) => {
      logger.error(`RabbitMQ connection blocked: ${reason}`);
      process.exit(1);
    });

    // If the Node process ends, close the RabbitMQ connection
    process.on('SIGINT', () => {
      connection.close();
      process.exit(0);
    });


    return resolve(connection);
  }));
});


/**
 * Returns an instance of HTTP requests logger
 */
serviceLocator.register('requestlogger', () => morgan('common'));


/**
 * Returns a Mongo connection instance.
 */
serviceLocator.register('mongo', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const connectionString = (!config.mongo.connection.username || !config.mongo.connection.password) ? `mongodb://${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.dbProd}` : `mongodb://${config.mongo.connection.username}:${config.mongo.connection.password}@${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.dbProd}`;
  mongoose.Promise = bluebird;
  const mongo = mongoose.connect(connectionString);
  mongo.connection.on('connected', () => {
    logger.info('Mongo Connection Established');
  });
  mongo.connection.on('error', (err) => {
    logger.error(`Mongo Connection Error : ${err}`);
    process.exit(1);
  });
  mongo.connection.on('disconnected', () => {
    logger.error('Mongo Connection disconnected');
    process.exit(1);
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongo.connection.close(() => {
      logger.error('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  return mongo;
});

/**
 * Creates an instance of the activeBias service
 */
serviceLocator.register('activeBiasService', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const mongo = servicelocator.get('mongo');
  return new activeBiasService(logger, mongo);
});

/**
 * Creates an instance of the activeBias controller
 */
serviceLocator.register('activeBiasController', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const activeBiasServe = servicelocator.get('activeBiasService');
  return new activeBiasController(logger, activeBiasServe);
});

module.exports = serviceLocator;
