'use strict';

var express = require('express');
var controller = require('./article.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


// todo return articles by type
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
