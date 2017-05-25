const dateUtils = require('date-fns')

const Monday = {
  is: date => dateUtils.isMonday(date),
}

const Tuesday = {
  is: date => dateUtils.isTuesday(date),
}

const Wednesday = {
  is: date => dateUtils.isWednesday(date),
}

const Thursday = {
  is: date => dateUtils.isThursday(date),
}

const Friday = {
  is: date => dateUtils.isFriday(date),
}

const Saturday = {
  is: date => dateUtils.isSaturday(date),
}

const Sunday = {
  is: date => dateUtils.isSunday(date),
}

const daysByAbbreviation = {
  mon: Monday,
  tues: Tuesday,
  wed: Wednesday,
  thurs: Thursday,
  fri: Friday,
  sat: Saturday,
  sun: Sunday
}

class DatePolicy {
  constructor({ days }) {
    this.days = []

    days.forEach((day) => {
      if (!daysByAbbreviation[day]) { throw new Error(`${day} is not a valid day`) }
      this.days = this.days.concat(daysByAbbreviation[day])
    })
  }

  contains(date) {
    return this.days.some(day => day.is(date))
  }
}

module.exports = DatePolicy
