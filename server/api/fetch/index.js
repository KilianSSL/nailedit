'use strict';

var express = require('express');
var controller = require('./fetch.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.fetch);

module.exports = router;