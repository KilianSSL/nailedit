'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Vote = require('../vote/vote.model');
var Comment = require('../comment/comment.model');

var ArticleSchema = new Schema({
  title: String,
  description: String,
  url: String,
  imageUuid: String,
  image: String,
  category: String,
  upvotes: [Vote.schema],
  downvotes: [Vote.schema],
  comments: [Comment.schema],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);