const mongoose = require('mongoose')

const timeSchema = mongoose.Schema({
  hour: {
    type: Number,
    min: 0,
    max: 23,
    required: true
  },
  minute: {
    type: Number,
    min: 0,
    max: 59,
    required: true
  }
})

const notificationSchema = mongoose.Schema({
  times: {
    type: [timeSchema],
    validate: {
      validator: v => v.length > 0
    }
  },
  days: {
    type: [String],
    validate: {
      validator: (v) => {
        const validDays = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun']
        return v.length > 0 && v.every(item => validDays.indexOf(item) >= 0)
      }
    }
  },
  message: {
    type: String,
    required: true,
    match: /\S/
  },
  channels: {
    type: [String],
    required: true,
    validate: {
      validator: (v) => {
        return v.length > 0 && v.every(channel => /^\S+$/.test(channel))
      }
    }
  }
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
