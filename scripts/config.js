module.exports = {
  db: {
    client: process.env.DB_CLIENT,
    useNullAsDefault: true,
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    },
  },
}
