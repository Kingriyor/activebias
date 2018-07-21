/**
 * Created by Ariyo (Kingriyor) Apakama.
 */

const Response = require('../lib/responseManager');
const HttpStatus = require('../constants/httpStatus');
var request = require('request');

class activeBiasController {
  /**
   * Class Constructor
   * @param logger - winston logger
   * @param activeBiasService
   */

  constructor(logger, activeBiasService) {
    this.logger = logger;
    this.activeBiasService = activeBiasService;
  }


  createNewactiveBias(req, res) {
    
     // ['type', 'amount', 'balance', 'month', 'day', 'age', 'spend_power',
  //     'marital_status', 'employment_status']
    const { accountNumber } = req.body;
    const { type } = req.body;
    const { amount } = req.body;
    const { balance } = req.body;
    const { month } = req.body;
    const { day } = req.body;
    const { age } = req.body;
    const { spend_power } = req.body;
    const { marital_status } = req.body;
    const { employment_status } = req.body;
    
    if (!accountNumber) {
      return Response.failure(res, { message: 'Enter accountNumber' }, HttpStatus.BadRequest);
    }
    if (!type) {
      return Response.failure(res, { message: 'Enter type !' }, HttpStatus.BadRequest);
    }
    if (!amount) {
      return Response.failure(res, { message: 'Enter amount !' }, HttpStatus.BadRequest);
    }
    if (!balance) {
      return Response.failure(res, { message: 'Enter balance !' }, HttpStatus.BadRequest);
    }
    if (!month) {
      return Response.failure(res, { message: 'Enter month !' }, HttpStatus.BadRequest);
    }
    if (!day) {
      return Response.failure(res, { message: 'Enter day !' }, HttpStatus.BadRequest);
    }
    if (!age) {
      return Response.failure(res, { message: 'Enter age !' }, HttpStatus.BadRequest);
    }
    if (!spend_power) {
      return Response.failure(res, { message: 'Enter spend_power !' }, HttpStatus.BadRequest);
    }
    if (!marital_status) {
      return Response.failure(res, { message: 'Enter marital_status !' }, HttpStatus.BadRequest);
    }
    if (!employment_status) {
      return Response.failure(res, { message: 'Enter employment_status !' }, HttpStatus.BadRequest);
    }

    const activeBiasDetails = req.body;


    request.post({
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      url:     'http://localhost/test2.php',
      body:    activeBiasDetails
    }, function(error, response, body){

      console.log(body);
      
      activeBiasDetails.predicted_category = body.accountNumber;

    // get response from model API before sending saving and sending response
    return this.activeBiasService.addNewactiveBias(activeBiasDetails)
      .then(response => Response.success(res, {
        message: 'activeBias was successfully Saved',
        response,
      }, HttpStatus.CREATED))
      .catch(error => Response.failure(res, {
        message: error,
        response: {},
      }, HttpStatus.NOT_FOUND));
    });

    
  }


  getactiveBiasByAccountNumber(req, res) {
    const { accountNumber } = req.params;

    if (!accountNumber) {
      return Response.failure(res, { message: 'Enter accountNumber' }, HttpStatus.BadRequest);
    }

    return this.activeBiasService.searchMerchantToken(accountNumber)
      .then(result => Response.success(res, {
        testValid: result.token,
        message: 'valid accountNumber',
        response: result
      }, HttpStatus.OK))
      .catch((error) => {
        this.logger.error('activeBiasUpdate', error);
        return Response.failure(res, {
          message: 'accountNumber invalid'
        }, HttpStatus.NOT_FOUND);
      });
  }


  updateactiveBiasByMerchantToken(req, res) {
    const { token } = req.body;
    const { merchantId } = req.params;
    const { cartItems } = req.body;
    const { totalAmount } = req.body;
    const { msisdn } = req.body;
    req.body.salesAmount = totalAmount;
    req.body.converted = true;
    const { body } = req;

    if (!token) {
      return Response.failure(res, { message: 'Enter token !', response: {} }, HttpStatus.BadRequest);
    }
    if (!merchantId) {
      return Response.failure(res, { message: 'Enter merchantId !' }, HttpStatus.BadRequest);
    }
    if (!cartItems) {
      return Response.failure(res, { message: 'Enter cartItems !' }, HttpStatus.BadRequest);
    }
    if (!totalAmount) {
      return Response.failure(res, { message: 'Enter totalAmount !' }, HttpStatus.BadRequest);
    }
    if (!msisdn) {
      return Response.failure(res, { message: 'Enter msisdn !' }, HttpStatus.BadRequest);
    }

    return this.activeBiasService.updateactiveBiasByMerchantToken(merchantId, token, body)
      .then(() => Response.success(res, {
        // testValid:  result._id,
        message: 'activeBias for token received'
        // response: result
      }, HttpStatus.ACCEPTED))
      .catch((error) => {
        this.logger.error('activeBiasUpdate', error);
        return Response.failure(res, {
          message: 'merchantId - token credentials invalid',
          // response: { merchantId: null }
        }, HttpStatus.NOT_FOUND);
      });
  }
}
module.exports = activeBiasController;
