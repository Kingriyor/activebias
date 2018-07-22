/**
 * Created by Ariyo (Kingriyor) Apakama.
 */

const Response = require('../lib/responseManager');
const HttpStatus = require('../constants/httpStatus');
var request = require('request');
const rp = require('request-promise');

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
    if (!req.body) {
      return Response.failure(res, { message: 'Empty Request' }, HttpStatus.BadRequest);
    }
    const { accountNumber } = req.body;
    const { amount } = req.body;
    const { balance } = req.body;
    const { month } = req.body;
    const { day } = req.body;
    const { age } = req.body;
    const { spend_power } = req.body;
    const activeBiasDetails = req.body;

    
    if (!accountNumber) {
      return Response.failure(res, { message: 'Enter accountNumber' }, HttpStatus.BadRequest);
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
    
    delete activeBiasDetails.accountNumber;
    const req_body = activeBiasDetails;
    const activeBiasService = this.activeBiasService;
    const options = {
      method: 'POST',
      uri: 'https://active-bias-working.herokuapp.com/',
      body:    req_body,
      headers: {
        'Content-Type': 'application/json'
      },
      json: true
    };

    return rp(options)
      .then((data) => {
        console.log(data);
        const predicted_category_result = data;
        activeBiasDetails.predicted_category = predicted_category_result.label;
        activeBiasDetails.accountNumber = accountNumber;
    
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

      })
      .catch(error => Response.failure(res, { message: 'Unable to reach profiling API !' }, HttpStatus.SERVICE_UNAVAILABLE));
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
        message: 'activeBias for token received'
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
