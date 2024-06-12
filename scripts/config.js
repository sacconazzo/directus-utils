const path = require('path')
const cwd = process.cwd()

const config = {
  db: {
    client: process.env.DB_CLIENT,
    useNullAsDefault: true,
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
    },
  },
  options: {
    module: false,
  },
  migrationPath: process.env.MIGRATIONS_PATH
    ? path.join(cwd, process.env.MIGRATIONS_PATH)
    : path.join(cwd, '/migrations/'),
}

try {
  const customConfig = require(`${process.cwd()}/directus-utils.js`)
  config.db.client = customConfig?.db?.client || config.db.client
  config.db.connection = customConfig?.db?.connection || config.db.connection
  config.options.module = customConfig?.options?.module
} catch {}

module.exports = config
