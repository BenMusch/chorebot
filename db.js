const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

const mongoose = require('mongoose')
mongoose.connect(uri)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log(`MongoDB connected on ${uri}`))

const userSchema = mongoose.Schema({
  username: String
})
exports.User = mongoose.model('User', userSchema)
