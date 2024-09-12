const fs = require('fs')
const root = require('find-root')()
const cwd = process.cwd()
const Knex = require('knex')
const { getMigrationKey } = require('./index')

const { db: dbConfig, migrationPath } = require('../config')

module.exports = async () => {
  let knex
  try {
    knex = Knex(dbConfig)

    const [settingsContent] = await knex('directus_settings').select().where({ id: 1 })

    const tamplateContent = fs.readFileSync(`${root}/scripts/migrate/templates/settings-translations-update.js`, 'utf8')

    const migrationContent = tamplateContent
      .replace('$$$$', settingsContent.translation_strings || '')
      .replace('%%%%', settingsContent.default_language || '')

    const migrationName = `${getMigrationKey()}-settings-translations-update.js`
    fs.writeFileSync(`${cwd}/${migrationPath}/${migrationName}`, migrationContent)

    console.log(`Migration created for translations: ${migrationName}`)
  } catch (err) {
    console.error(err.message)
  } finally {
    knex && knex.client.pool.destroy()
  }
}
