/**
 * Created by Ariyo (Kingriyor) Apakama.
 */

const MongoDBHelper = require('../lib/MongoDBHelper');
const activeBiasModel = require('../models/activeBiasModel');

class activeBiasService {
  /**
   * The constructor
   *
   * @param logger
   * @param mongoDBClient
   */
  constructor(logger, mongoDBClient) {
    this.logger = logger;
    this.mongoDBClientHelper = new MongoDBHelper(mongoDBClient, activeBiasModel);
  }


  addNewactiveBias(data) {
    const newactiveBias = data;
    this.logger.info('New activeBias', newactiveBias);
    return this.mongoDBClientHelper.save(newactiveBias)
      .then(response => response);
  }


  /**
   * Gets a single category
   *
   * @param merchantId
   * @param token
   * @returns {Promise}
   */
  searchMerchantToken(merchantId, token) {
    const params = { conditions: { merchantId, token } };
    return this.mongoDBClientHelper.get(params);
  }


  /**
   * Gets a single category
   *
   * @param merchantId
   * @param token
   * @returns {Promise}
   */
  updateactiveBiasByMerchantToken(merchantId, token, data) {
    const params = { conditions: { merchantId, token } };
    return this.mongoDBClientHelper.update(params, data);
  }
}
module.exports = activeBiasService;
