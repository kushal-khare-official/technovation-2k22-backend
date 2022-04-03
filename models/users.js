const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  mobile_number: {
    type: Number,
    required: true,
    min: 1000000000,
    max: 9999999999,
    unique: true,
  },
  reffered: {
    type: Number,
    required: true,
    default: 0,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
