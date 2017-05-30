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

class NotificationClass {
  get currentUser() {
    return this.users[0]
  }

  setCurrentUser(newUser, cb) {
    let newUsers = this.users

    const indexToSwap = newUsers.indexOf(newUser)
    newUsers[indexToSwap] = this.currentUser
    newUsers[0] = newUser

    this.update({ users: newUsers }, {}, cb)
  }

  rotateUsers(cb) {
    const newUsers = this.users.slice(1).concat([this.currentUser])
    this.update({ users: newUsers }, {}, cb)
  }

  addUser(user, cb) {
    const newUsers = this.users.concat([user])
    this.update({ users: newUsers }, {}, cb)
  }

  removeUser(user) {
    const indexToRemove = this.users.indexOf(user)
    this.users = this.users.slice(0, indexToRemove).concat(this.users.slice(indexToRemove + 1))
  }
}

notificationSchema.loadClass(NotificationClass)

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
