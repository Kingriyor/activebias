/**
 * Created by Femibams on 21/07/2018.
 * objective: building to scale
 */
const config = require('../config/config');
const serviceLocator = require('../lib/serviceLocator');

// Controllers
const MainController = require('../controllers/main');

const MainService = require('../services/main');


serviceLocator.register('mainService', (servicelocator) => {
  return new MainService();
});

serviceLocator.register('mainController', (servicelocator) => {
  const mainService = servicelocator.get('mainService');
  return new MainController(mainService);
});


module.exports = serviceLocator;
