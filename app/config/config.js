/**
 * Created by Ariyo (Kingriyor) Apakama.
 */

const appName = 'ACTIVEBIAS';

const config = {
  appName,
  server: {
    // url: process.env.APP_URL,
    // port: process.env.APP_PORT
    url: '',
    port: 3110
  },
  mongo: {
    connection: {
      // host: process.env.MONGODB_HOST,
      // username: process.env.MONGODB_USER,
      // password: process.env.MONGODB_PASSWORD,
      // port: process.env.MONGODB_PORT,
      // dbProd: process.env.MONGODB_DATABASE_NAME
      host: '34.250.58.249',
      username:'digital_user',
      password: 'dW5rURDJHdx9v2hV',
      port: '12707',
      dbProd: 'digital_calculator_db'
    },
    collections: {
      activeBias: 'user_profiles',
    },
    // queryLimit: process.env.MONGODB_QUERY_LIMIT,
    queryLimit: 1000
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
