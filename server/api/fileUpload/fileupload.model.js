'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
  country: String,
  city: String,
  code: String,
  active: Boolean,
  user: String
});

module.exports = mongoose.model('Fileupload', LocationSchema);
