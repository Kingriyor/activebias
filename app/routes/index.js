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
  
  server.post({
    path: '/activeBiass/:merchantId/tokens',
    name: 'Update activeBias',
    version: '1.0.0'
  }, (req, res) => activeBiasController.updateactiveBiasByMerchantToken(req, res));


  server.post({
    path: '/activeBiass/create',
    name: 'New activeBias',
    version: '1.0.0'
  }, (req, res) => activeBiasController.createNewactiveBias(req, res));

};

