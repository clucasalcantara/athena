import { createLink } from 'rethinkly'

const config = {
  host: process.env.RETHINKDB_URL,
  port: process.env.RETHINKDB_PORT,
  db: process.env.DB_NAME,
}

const Rethinkly = () => createLink(config)

export default Rethinkly
