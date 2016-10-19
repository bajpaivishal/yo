'use strict';


var express = require('express');
var controller = require('./entry.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
//router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:listCtrl', controller.totalAmount);

module.exports = router;