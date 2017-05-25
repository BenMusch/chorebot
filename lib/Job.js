const CronJob = require('cron').CronJob

class Job {
  constructor(notification) {
    this.notification = notification
  }

  /**
   * Returns a formatted chron string for the notification's schedule
   * Read more about chron formatting: http://crontab.org/
   */
  get chronStrings() {
    const days = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat']
    const daysForRule = this.notification.days.map(day => days.indexOf(day)).sort()

    return this.notification.times.map((time) => {
      return `0 ${time.minute} ${time.hour} * * ${daysForRule.join(',')}`
    })
  }

  schedule() {
    return null
  }
}

module.exports = Job
