'use strict';

var express = require('express');
var controller = require('./vote.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/:id', auth.isAuthenticated(), controller.create);

module.exports = router;