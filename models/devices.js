const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)

const Device = mongoose.model('Device', deviceSchema)

module.exports = Device
