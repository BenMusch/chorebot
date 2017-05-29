const uri = require('./constants').databaseUri

const mongoose = require('mongoose')
mongoose.connect(uri)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log(`MongoDB connected on ${uri}`))

module.exports = db
