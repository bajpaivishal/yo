'use strict';

var _ = require('lodash');
var Fileupload = require('./fileupload.model.js');
var cloudinary = require('cloudinary'), fs = require('fs');

cloudinary.config({
  cloud_name: 'alleviate-tech',
  api_key: '195525224327711',
  api_secret: 'BBMMP863Oc1tv0ZTwsMXEW1ahp8'
});


// Get list of locations
exports.index = function(req, res) {
		cloudinary.uploader.upload(req.files[0].destination +"/"+ req.files[0].filename, function(result) {
  });
  //db.things.insert({ name : 'Arvind', gender : 'male'});
  //db.fileuploads.insert( { user : "test" } );
  return res.status(200).json({fileName:req.files[0].filename});
  
};

function handleError(res, err) {
  return res.status(500).send(err);
}
