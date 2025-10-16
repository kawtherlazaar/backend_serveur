const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
  titer: {
    type: String,
    required: [true, 'Please provide title']
  },
  contenue: {
    type: String,
    required: [true, 'Please provide content']
  },
  imageUrl: {
    type: String
  }
});

module.exports = mongoose.model('Article', articleSchema);

