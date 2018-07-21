/**
 * Created by EMEHINOLA Idowu on 19/06/2018.
 */

const appName = 'ACTIVEBIAS';

const config = {
  appName,
  server: {
    url: process.env.APP_URL,
    port: process.env.APP_PORT
  },
  mongo: {
    connection: {
      host: process.env.MONGODB_HOST,
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      port: process.env.MONGODB_PORT,
      dbProd: process.env.MONGODB_DATABASE_NAME
    },
    collections: {
      activeBias: 'hackathon_2018_2',
    },
    queryLimit: process.env.MONGODB_QUERY_LIMIT,
  },
  mongoErrorCode: {
    duplicateId: 11000
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE === 'true'
  },
  collections: {
    report_collection: 'report'
  }
};

module.exports = config;
