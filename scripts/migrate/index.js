module.exports = {
  getMigrationKey: () => {
    const date = new Date()
    return `${date.toISOString().split('T')[0].replaceAll('-', '')}${date.getTime()}`
  },
  migrate: async (str, options) => {
    for (const entity in str) {
      const key = str[entity]
      const createMigration = require(`./${entity}`)
      await createMigration(key)
    }
  },
}
