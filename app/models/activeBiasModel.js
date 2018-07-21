
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
  // ['type', 'amount', 'balance', 'month', 'day', 'age', 'spend power',
  //     'marital status', 'employment status']
  accountNumber: {
    type: 'String',
    required: true
  },
  amount: {
    type: 'String',
    required: false
  },
  balance: {
    type: 'String',
    required: false
  },
  month: {
    type: 'String',
    required: false
  },
  day: {
    type: 'String',
    required: false
  },
  age: {
    type: 'String',
    required: false,
  },
  spend_power: {
    type: 'String',
    required: false,
  },
  marital_status: {
    type: 'String',
    required: false,
  },
  employment_status: {
    type: 'String',
    required: false,
  },
  predicted_category: {
    type: 'String',
    required: false,
  }
});

activeBiasSchema.plugin(timestamps);

const activeBiasModel = mongoose.model(collections.activeBias, activeBiasSchema);
module.exports = activeBiasModel;
