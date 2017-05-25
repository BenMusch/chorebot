const Job = require('../lib/Job')
const Notification = require('../lib/Notification')

describe('Scheduler', () => {
  describe('chronStrings', () => {
    let notification;

    beforeEach(() => {
      notification = new Notification({
        message: 'Some message',
        channels: ['channel'],
        users: ['benmusch']
      })
    })

    it('returns the chron-formatted strings for the notification', () => {
      notification.times = [{hour: 1, minute: 30}]
      notification.days = ['mon', 'tues', 'wed', 'sun']

      let strs = new Job(notification).chronStrings

      expect(strs).toEqual(['0 30 1 * * 0,1,2,3'])

      notification.times = [{hour: 1, minute: 30}, {hour: 23, minute: 10}]
      notification.days = ['sat', 'fri', 'thurs']

      strs = new Job(notification).chronStrings

      expect(strs).toEqual([
        '0 30 1 * * 4,5,6',
        '0 10 23 * * 4,5,6'
      ])
    })
  })
})
