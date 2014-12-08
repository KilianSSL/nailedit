'use strict';

var _ = require('lodash');
var Vote = require('./vote.model');
var Article = require('../article/article.model');

// Creates a new Vote in the Article Document.
exports.create = function(req, res) {
  Article.findById(req.params.id,function(err,article) {
    if (err) {
      return handleError(res, err);
    }

    if (!article) {
      return res.send(404);
    }

    // vote object
    var vote = {
      _user:req.user._id
    };

    // oops, thaaat's a shitty approach. i'm not a mongo-pro yet :-)
    // i bet that will terribly fail if i have a gazillion of votes.
    _.forEach(article.upvotes,function(up) {
      if(up._user.toString() == req.user._id.toString()) {
        article.upvotes.id(up._id).remove();
      }
    });

    _.forEach(article.downvotes,function(down) {
      if(down._user.toString() == req.user._id.toString()) {
        article.downvotes.id(down._id).remove();
      }
    });

    // figure out the direction, up or downvote
    if(req.body.type == 'upvote') {
      article.upvotes.push(vote);
    } else if(req.body.type == 'downvote') {
      article.downvotes.push(vote);
    }

    article.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(article);
    });

  });
};

function handleError(res, err) {
  return res.send(500, err);
}