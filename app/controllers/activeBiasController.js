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
    const ac = JSON.stringify(accountNumber);
    const bd = JSON.stringify(activeBiasDetails);
    const activeBiasService = this.activeBiasService;
    let req_body = {};
    req_body[accountNumber] = bd ;
    req_body = JSON.stringify(req_body);

    request.post({
      url:     'https://active-bias-working.herokuapp.com/',
      body:    req_body
    }, function(error, response, body){
      if(error){
        return Response.failure(res, { message: 'Unable to reach profiling API !' }, HttpStatus.SERVICE_UNAVAILABLE);
      }
      else{
      const predicted_category_result = JSON.parse(body);
      activeBiasDetails.predicted_category = predicted_category_result.label;
  
    // saving to db
    return activeBiasService.addNewactiveBias(activeBiasDetails)
      .then(response => Response.success(res, {
        message: 'profile was successfully Saved',
        response,
      }, HttpStatus.CREATED))
      .catch(error => Response.failure(res, {
        message: error,
        response: {},
      }, HttpStatus.NOT_FOUND));
      }

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


  getallByPrediction(req, res) {
    const { predicted_category } = req.params;

    if (!predicted_category) {
      return Response.failure(res, { message: 'Enter predicted_category' }, HttpStatus.BadRequest);
    }

    return this.activeBiasService.searchByPrediction(predicted_category)
      .then(result => Response.success(res, {
        testValid: result.token,
        message: 'valid prediction category',
        response: result
      }, HttpStatus.OK))
      .catch((error) => {
        this.logger.error('predicted_category_invalid', error);
        return Response.failure(res, {
          message: 'predicted_category invalid'
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
