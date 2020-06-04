const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const todosDB = low(adapter)

todosDB.defaults({ lists: [] })
  .write()

export default todosDB;
