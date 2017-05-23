const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
  times: [{
    hour: Number,
    minute: Number
  }],
  days: [String],
  message: String,
  channel: String,
  users: User
})

const Notification = mongoose.model('Notification', notificationSchema)



module.exports = Notification
