const databaseUri = require('constants').databaseUri
const agenda = new Agenda({db: {address: databseUri}})

module.exports = agenda
