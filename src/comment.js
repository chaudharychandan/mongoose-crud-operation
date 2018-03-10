const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const CommentSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Comment = mongoose.model('comment', CommentSchema)

module.exports = Comment;
