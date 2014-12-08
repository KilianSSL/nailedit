'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  text: String,
  date: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Comment', CommentSchema);