/**
 * Created by Femibams on 21/07/2018.
 * objective: building to scale
 */
const mysql = require('mysql');
const config = require('../config/config');
const serviceLocator = require('../lib/serviceLocator');

// Controllers
const MainController = require('../controllers/main');

const MainService = require('../services/main');

serviceLocator.register('mysqlConnector', (servicelocator) => {
    let connection = mysql.createConnection({
        host     : config.mysql.host,
        user     : config.mysql.user,
        password : config.mysql.password
      });
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
       
        console.log('connected as id ' + connection.threadId);
      });
    return connection;
})
serviceLocator.register('mainService', (servicelocator) => {
  const mysql = servicelocator.get('mysqlConnector');
  return new MainService(mysql);
});

serviceLocator.register('mainController', (servicelocator) => {
  const mainService = servicelocator.get('mainService');
  return new MainController(mainService);
});


module.exports = serviceLocator;
