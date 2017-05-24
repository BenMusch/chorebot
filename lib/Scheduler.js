const schedule = require('node-schedule')

class Scheduler {
  constructor() {
    this.jobs = []
  }

  rulesFromNotification(notification) {
    const days = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat']
    const daysForRule = notification.days.map(day => days.indexOf(day))

    return notification.times.map((time) => {
      return {
        hour: time.hour,
        minute: time.minute,
        dayOfWeek: daysForRule
      }
    })
  }

  schedule(rules) {
    this.jobs.concat(rules.map((rule) => {
      jobs.concat(schedule.scheduleJob(rule, () => { return null }))
    }))
  }
}

module.exports = Scheduler
