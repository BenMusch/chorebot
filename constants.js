const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
const port = process.env.PORT || 3000

module.exports = {
  databaseUri,
  port
}
