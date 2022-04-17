const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  eventId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
      type: String,
      required: false
  },
  coordinators: {
      type: Array,
      required: false
  },
  teamType: {
    type:String,
    required:true
  },
  category: {
    type:String,
    enum:['technical','non-technical','gaming','literary'],
    required:true,
    default:'technical'
  }
  

})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
