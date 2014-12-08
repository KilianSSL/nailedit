'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VoteSchema = new Schema({
  date: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Vote', VoteSchema);