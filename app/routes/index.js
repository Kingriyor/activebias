/**
 * Created by Femibams on 21/07/2018.
 */

module.exports.setup = function setup(server, serviceLocator) {
    const mainController = serviceLocator.get('mainController');
  
    server.get({
      path: '/',
      name: 'base',
      version: '1.0.0'
    }, (req, res) => res.send('Welcome to ReCode Hackathon'));
  
    server.post({
      path: '/api',
      name: 'Test Post'
    }, (req, res) => mainController.testPost(req, res));

  };
  
  