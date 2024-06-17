const fs = require('fs')
const root = require('find-root')()
const Knex = require('knex')
const { getMigrationKey } = require('./index')

const { db: dbConfig, options, migrationPath } = require('../config')

module.exports = async () => {
  let knex
  try {
    knex = Knex(dbConfig)

    const [settingsContent] = await knex('directus_settings').select().where({ id: 1 })

    const tamplateContent = fs.readFileSync(
      `${root}/scripts/migrate/templates/settings-update${options.module ? '-es' : ''}.js`,
      'utf8',
    )

    const migrationContent = tamplateContent.replace('%%%%', JSON.stringify(settingsContent))

    const migrationName = `${getMigrationKey()}-settings-update.js`
    fs.writeFileSync(`${migrationPath}/${migrationName}`, migrationContent)

    console.log(`Creata migration per settings: ${migrationName}`)
  } catch (err) {
    console.error(err.message)
  } finally {
    knex && knex.client.pool.destroy()
  }
}
