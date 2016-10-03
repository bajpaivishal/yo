'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StudentSchema = new Schema({
  country: String,
  city: String,
  code: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model('student', StudentSchema);
