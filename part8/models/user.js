const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 5,
    required: true
  },
  favoriteGenre: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', schema)
