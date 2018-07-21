/**
 * Created by Ariyo (Kingriyor) Apakama.
 */

const Response = require('../lib/responseManager');
const HttpStatus = require('../constants/httpStatus');

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
    const activeBiasDetails = req.body;
    return this.activeBiasService.addNewactiveBias(activeBiasDetails)
      .then(response => Response.success(res, {
        message: 'activeBias was successfully Saved',
        response,
      }, HttpStatus.CREATED))
      .catch(error => Response.failure(res, {
        message: error,
        response: {},
      }, HttpStatus.NOT_FOUND));
  }


  getactiveBiasByMerchantToken(req, res) {
    const { token } = req.params;
    const { merchantId } = req.params;

    if (!token) {
      return Response.failure(res, { message: 'Enter token' }, HttpStatus.BadRequest);
    }
    if (!merchantId) {
      return Response.failure(res, { message: 'Enter merchantId !' }, HttpStatus.BadRequest);
    }

    return this.activeBiasService.searchMerchantToken(merchantId, token)
      .then(result => Response.success(res, {
        testValid: result.token,
        message: 'valid merchant_id and token',
        response: result
      }, HttpStatus.OK))
      .catch((error) => {
        this.logger.error('activeBiasUpdate', error);
        return Response.failure(res, {
          message: 'merchantId - token credentials invalid'
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
