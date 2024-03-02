module.exports = {
  db: {
    client: 'mysql',
    connection: {
      user: 'root',
      password: 'password',
      database: 'directus',
      host: 'localhost',
      port: 3306,
    },
  },
  options: {
    module: false, // enables ES module standard
  },
}
