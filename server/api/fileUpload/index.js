'use strict';

var express = require('express');
var path = require('path');
var controller = require('./fileupload.controller');

var router = express.Router();
var app = express();

var multer  = require('multer');
var prefix = Date.now() + "_" + Math.ceil(Math.random()*9999);

var upload = multer({storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
	 console.log(file.originalname);
    cb(null, prefix + file.originalname);
  } 
})});


router.post('/', upload.array('file',2), controller.index);

module.exports = router;
