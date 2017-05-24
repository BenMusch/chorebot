const Schema = require('mongoose').Schema

const userSchema = new Schema({
  name: {
    type: String,
    match: /^\S+$/,
    required: true
  },
  notifications: {
    type: Boolean,
    default: true
  }
})

class User {
  get username() {
    return `@${this.name}`
  }
}

userSchema.loadClass(User)

module.exports = userSchema
