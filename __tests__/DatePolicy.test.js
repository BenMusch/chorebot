const DatePolicy = require('../lib/DatePolicy')

describe('DatePolicy', () => {
  it('Will return true if the given day is one of the days the policy is set to', () => {
    const policy = new DatePolicy({ days: ['tues', 'wed', 'fri', 'sat'] })

    const sun = new Date(2017, 4, 21)
    const mon = new Date(2017, 4, 22)
    const tues = new Date(2017, 4, 23)
    const wed = new Date(2017, 4, 24)
    const thurs = new Date(2017, 4, 25)
    const fri = new Date(2017, 4, 26)
    const sat = new Date(2017, 4, 27)

    expect(policy.contains(sun)).toBeFalsy()
    expect(policy.contains(mon)).toBeFalsy()
    expect(policy.contains(tues)).toBeTruthy()
    expect(policy.contains(wed)).toBeTruthy()
    expect(policy.contains(thurs)).toBeFalsy()
    expect(policy.contains(fri)).toBeTruthy()
    expect(policy.contains(sat)).toBeTruthy()
  })
})
