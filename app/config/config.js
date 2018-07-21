/**
 * Created by Femibams on 21/07/2018.
 */

const appName = 'ReCode Hackathon';

const config = {
  appName,
  server: {
    url: process.env.APP_URL,
    port: process.env.APP_PORT
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE === 'true'
  },
  mysql: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD 
  }
};

module.exports = config;
