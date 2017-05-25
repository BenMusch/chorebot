const Notification = require('../lib/models/Notification')

describe('Notification', () => {
  const baseData = {
    times: [{ hour: 12, minute: 30 }, { hour: 23, minute: 59 }, { hour: 0, minute: 0 }],
    days: ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'],
    message: 'Here is a message!',
    channels: ['office', 'general'],
    users: [{ name: 'benmusch' }]
  }
  let notification;

  beforeEach(() => {
    notification = new Notification(baseData)
  })

  it('is valid with the base data', () => {
    errors = notification.validateSync()
    expect(errors).toBeFalsy()
  })

  describe('message', () => {
    it('needs to be provided', () => {
      notification.message = null

      errors = notification.validateSync()
      expect(errors.errors['message']).toBeTruthy()
    })

    it('cant be only whitespace', () => {
      notification.message = '   '

      errors = notification.validateSync()
      expect(errors.errors['message']).toBeTruthy()
    })
  })

  describe('days', () => {
    it('cannot be empty', () => {
      notification.days = []

      errors = notification.validateSync()
      expect(errors.errors['days']).toBeTruthy()
    })

    it('cannot contain an invalid day', () => {
      notification.days = ['tue']

      errors = notification.validateSync()
      expect(errors.errors['days']).toBeTruthy()
    })
  })

  describe('times', () => {
    it('cannot be empty', () => {
      notification.times = []

      errors = notification.validateSync()
      expect(errors.errors['times']).toBeTruthy()
    })

    it('must have hours between 0 and 23', () => {
      notification.times = [{ hour: -1, minute: 30 }]

      errors = notification.validateSync()
      expect(errors.errors['times.0.hour']).toBeTruthy()

      notification.times = [{ hour: 24, minute: 30 }]

      errors = notification.validateSync()
      expect(errors.errors['times.0.hour']).toBeTruthy()
    })

    it('must have minutes between 0 and 59', () => {
      notification.times = [{ hour: 12, minute: -1 }]

      errors = notification.validateSync()
      expect(errors.errors['times.0.minute']).toBeTruthy()

      notification.times = [{ hour: 12, minute: 60 }]

      errors = notification.validateSync()
      expect(errors.errors['times.0.minute']).toBeTruthy()
    })

    it('must have hours and minutes', () => {
      notification.times = [{ hour: 12}]

      errors = notification.validateSync()
      expect(errors.errors['times.0.minute']).toBeTruthy()

      notification.times = [{ minute: 30 }]

      errors = notification.validateSync()
      expect(errors.errors['times.0.hour']).toBeTruthy()
    })
  })

  describe('channels', () => {
    it('needs to be provided', ()=> {
      notification.channels = []

      errors = notification.validateSync()
      expect(errors.errors['channels']).toBeTruthy()
    })

    it('cannot have whitespace', () => {
      notification.channels = ['with whitespace']

      errors = notification.validateSync()
      expect(errors.errors['channels']).toBeTruthy()
    })
  })

  describe('users', () => {
    it('needs to be provided', () => {
      notification.users = []

      errors = notification.validateSync()
      expect(errors.errors['users']).toBeTruthy()
    })

    it('must have a name', () => {
      notification.users = [{}]

      errors = notification.validateSync()
      expect(errors.errors['users.0.name']).toBeTruthy()
    })

    it('cannot have whitespace in the name', () => {
      notification.users = [{ name: '' }]

      errors = notification.validateSync()
      expect(errors.errors['users.0.name']).toBeTruthy()

      notification.users = [{ name: '   ' }]

      errors = notification.validateSync()
      expect(errors.errors['users.0.name']).toBeTruthy()

      notification.users = [{ name: 'with whitespace' }]

      errors = notification.validateSync()
      expect(errors.errors['users.0.name']).toBeTruthy()
    })
  })
})
