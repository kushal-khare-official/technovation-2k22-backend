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
  userType: {
    type: String,
    enum: ['participant', 'admin', 'coordinator', 'treasurer', 'spoc', 'ambassador'],
    default: 'participant',
    required: true,
  },
  collegeType:{
    type: String,
    enum: ['college','school'],
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
  
  kitNo: {
    type: Number,
    unique:true,
    required: false,
  },
  kitTxnId: {
    type: String,
    unique:true,
    required: false,
  },
  kitTxnStatus: {
    type:String,
    enum: ['pending','new', 'success','failed'],
    required:false,
    default:'new'
  }

})

const User = mongoose.model('User', userSchema)

module.exports = User
