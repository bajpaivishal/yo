'use strict';

var express = require('express');
var path = require('path');
var controller = require('./fileupload.controller');

var router = express.Router();
var app = express();

var multer  = require('multer');


var upload = multer({storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + Math.ceil(Math.random()*9999) + file.originalname);
  }
})});
router.post('/', upload.array('file',2), controller.index);

module.exports = router;
