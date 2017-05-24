
const Scheduler = require('../lib/Scheduler')
const Notification = require('../lib/Notification')

global.schedule =  { scheduleJob: jest.fn() }

describe('Scheduler', () => {
  describe('scheduleNotification', () => {
    let notification;

    beforeEach(() => {
      notification = new Notification({
        message: 'Some message',
        channels: ['channel'],
        users: ['benmusch']
      })
    })

    it('schedules notifications for the notification', () => {
      notification.times = [{hour: 1, minute: 30}]
      notification.days = ['mon', 'tues', 'wed', 'sun']

      let rules = new Scheduler().rulesFromNotification(notification)

      expect(rules).toEqual([{
        dayOfWeek: [1, 2, 3, 0],
        hour: 1,
        minute: 30
      }])

      notification.times = [{hour: 1, minute: 30}, {hour: 23, minute: 10}]
      notification.days = ['sat', 'fri', 'thurs']

      rules = new Scheduler().rulesFromNotification(notification)

      expect(rules).toEqual([{
          dayOfWeek: [6, 5, 4],
          hour: 1,
          minute: 30
        },
        {
          dayOfWeek: [6, 5, 4],
          hour: 23,
          minute: 10
        }
      ])
    })
  })
})
