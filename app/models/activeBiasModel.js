
/**
 * Created by Ariyo (Kingriyor) Apakama.
 */

const mongoose = require('mongoose');
const config = require('../config/config');
// const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const { collections } = config.mongo;
const { Schema } = mongoose;


const activeBiasSchema = new Schema({
  campaignId: {
    type: 'String',
    required: false
  },
  merchantId: {
    type: 'String',
    required: true
  },
  msisdn: {
    type: 'String',
    required: true
  },
  converted: {
    type: 'Boolean',
    required: false,
    default: false
  },
  salesAmount: {
    type: 'Number',
    required: false,
    default: 0
  },
  token: {
    type: 'String',
    required: true,
  },
  campaignType: {
    type: 'String',
    required: true,
    enum: ['existing', 'new']
  },
  cartItems: {
    type: ['Object'],
    required: false,
    default: []
  }
});

activeBiasSchema.plugin(timestamps);

const activeBiasModel = mongoose.model(collections.activeBias, activeBiasSchema);
module.exports = activeBiasModel;
