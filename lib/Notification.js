const mongoose = require('mongoose')

const Time = require('./Time')
const User = require('./User')

const validateHasElements = val => val.length > 0
const validateAllElements = (val, func) => validateHasElements(val) && val.every(func)

const notificationSchema = mongoose.Schema({
  times: {
    type: [Time],
    validate: {
      validator: validateHasElements
    }
  },
  days: {
    type: [String],
    validate: {
      validator: (v) => {
        const validDays = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat']
        return validateAllElements(v, item => validDays.indexOf(item) >= 0)
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
        return validateAllElements(v, channel => /^\S+$/.test(channel))
      }
    }
  },
  users: {
    type: [User],
    required: true,
    validate: {
      validator: validateHasElements
    }
  }
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
