'use strict';

var _ = require('lodash');
//var Fileupload = require('./fileupload.model.js');
var cloudinary = require('cloudinary'), fs = require('fs');

cloudinary.config({
  cloud_name: 'deu0ejoxo',
  api_key: '215499315334119',
  api_secret: '-m3b4oW2Psx0jprBG8HH9fE78qA'
});


// Get list of locations
exports.index = function(req, res) {
  console.log(req.files);
  cloudinary.uploader.upload(req.files[0].destination +"/"+ req.files[0].filename, function(result) {
    console.log(result);
  });
  return res.status(200).json({donee:"okay"});
};

function handleError(res, err) {
  return res.status(500).send(err);
}
