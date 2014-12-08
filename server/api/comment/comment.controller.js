'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');
var Article = require('../article/article.model');

// Creates a new comment in the DB.
exports.create = function(req, res) {
  Article.findById(req.params.id,function(err,article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }

    var comment = {
      text:req.body.text,
      _user:req.user._id
    };

    article.comments.push(comment);

    article.save(function (err) {
      if (err) {
        return handleError(res, err);
      }

      Article
        .findOne(article)
        .populate('comments._user','name')
        .exec(function (err, article) {
          return res.json(article);
        });
    });

  });
};

// Deletes a comment from the DB.
exports.destroy = function(req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }
    comment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
