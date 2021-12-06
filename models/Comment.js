const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
});

module.exports = mongoose.model("Comment", commentSchema);
