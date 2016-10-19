'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StudentSchema = new Schema({
  name: String,
  product: String,
  member: Object,
  memberPrice: Object,
  price: Number,
  date: String,
});

module.exports = mongoose.model('entry', StudentSchema);
