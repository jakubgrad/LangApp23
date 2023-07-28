const mongoose = require('mongoose')

const textSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: {
    type: Map, // Using Map to store page content as key-value pairs
    of: String, // Values in the Map will be strings
  },
  pageTranslations: {
    type: Map, // Using Map to store page translations as key-value pairs
    of: mongoose.Schema.Types.Mixed, // Values in the Map can be of mixed types
  },
});

  
module.exports = mongoose.model('Text', textSchema)