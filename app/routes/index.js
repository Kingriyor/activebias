/**
 * Created by Kingriyor on 20/06/2018.
 */

module.exports.setup = function setup(server, serviceLocator) {
  const activeBiasController = serviceLocator.get('activeBiasController');
  
  server.get({
    path: '/',
    name: 'base',
    version: '1.0.0'
  }, (req, res) => res.send('WELCOME TO ACTIVEBIAS'));

  server.get({
    path: '/activeBiass/:accountNumber',
    name: 'get profile',
    version: '1.0.0'
  }, (req, res) => activeBiasController.getactiveBiasByAccountNumber(req, res));

  server.get({
    path: '/activeBiass/getPredictions/:predicted_category',
    name: 'get profile',
    version: '1.0.0'
  }, (req, res) => activeBiasController.getallByPrediction(req, res));


  server.post({
    path: '/activeBiass/sendProfile',
    name: 'New activeBias',
    version: '1.0.0'
  }, (req, res) => activeBiasController.createNewactiveBias(req, res));

};

