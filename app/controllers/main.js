/* eslint no-underscore-dangle:0 */
const Response = require('../lib/responseManager');
const httpStatus = require('../constants/httpStatus');
const config = require('../config/config');
var rp = require('request-promise');

class Main {
  /**
   * @param service
   */
  constructor(mainService) {
    this.mainService = mainService;
  }

  testPost(req, res) {
    const { accountNumber, option } = req.body;

    

    return Response.success(res, {
        message: 'POST endpoint working!',
        response: {},
      }, httpStatus.OK);
  }
}

module.exports = Main;
