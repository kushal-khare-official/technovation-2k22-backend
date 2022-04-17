const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
  {
    notificationId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    links: {
      type: Array,
      default: [],
      required: false,
    },
  },
  { timestamps: true }
)

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
