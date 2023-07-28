const mongoose = require('mongoose')

const textSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: {
    type: Map,
    of: String
  },
  pageTranslations: {
    type: Map,
    of: String
  }
});
  
module.exports = mongoose.model('Text', textSchema)