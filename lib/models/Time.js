const Schema = require('mongoose').Schema

const timeSchema = new Schema({
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

class Time {
  get humanTime() {
    let suffix = this.hour >= 12 ? 'pm' : 'am'
    let hours = this.hour % 12
    return `${hours}:${this.minute} ${suffix}`
  }

  setHumanTime(timeStr, cb){
    timeStr = timeStr.toLowerCase()

    const europeanTime = /^[0-2]?[0-9]:[0-5][0-9]$/
    const americanTime = /^[0-1]?[0-9]:[0-5][0-9]\s*(am|pm)$/

    let hour = null
    let minute = null

    if (americanTime.test(timeStr)) {
      const isPm = timeStr.split(' ')[1] == 'pm'
      timeStr = timeStr.split(' ')[0]

      hour = parseInt(timeStr.split(':')[0])
      minute = parseInt(timeStr.split(':')[1])
      if (isPm) hours += 12
    }
    else if (europeanTime.test(timeStr)) {
      hour = parseInt(timeStr.split(':')[0])
      minute = parseInt(timeStr.split(':')[1])
    }
    else {
      throw Error(`${timeStr} is not a valid time`)
    }

    this.update({ hour, minute }, {}, cb)
  }
}

timeSchema.loadClass(Time)

module.exports = timeSchema
