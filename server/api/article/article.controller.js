'use strict';

var _ = require('lodash');
var Article = require('./article.model');

// Get list of articles
exports.index = function(req, res) {
  Article
    .find()
    .populate('_user','name')
    .populate('comments._user','name')
    .exec(function (err, articles) {
      if(err) { return handleError(res, err); }

      return res.json(200, articles);
    });
};

// Get a single article
exports.show = function(req, res) {
  Article
    .findById(req.params.id)
    .populate('_user','name')
    .populate('comments._user','name')
    .exec(function (err, article) {
      console.log(article);
      if(err) { return handleError(res, err); }
      if(!article) { return res.send(404); }

      return res.json(article);
    });
};

// Creates a new article in the DB.
exports.create = function(req, res) {
  var article = {
    _user:req.user._id
  };

  // auto-prefix http in case it's missing
  if(req.body.url !== undefined && req.body.url.indexOf('http') === -1) {
    req.body.url = 'http://'+req.body.url;
  }

  // extend the request body with the user id
  _.extend(req.body,article);

  // save
  Article.create(req.body, function(err, article) {
    if(err) { return handleError(res, err); }
    return res.json(201, article);
  });
};

// Deletes a article from the DB.
exports.destroy = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    article.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
