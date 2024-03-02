const fs = require('fs')
const root = require('find-root')()
const cwd = process.cwd()
const Knex = require('knex')
const { getMigrationKey } = require('./index')

const { db: dbConfig, options } = require('../config')

module.exports = async () => {
  let knex
  try {
    knex = Knex(dbConfig)

    const [settingsContent] = await knex('directus_settings').select().where({ id: 1 })

    const tamplateContent = fs.readFileSync(
      `${root}/scripts/migrate/templates/settings-translations-update${options.module ? '-es' : ''}.js`,
      'utf8',
    )

    const migrationContent = tamplateContent
      .replace('$$$$', settingsContent.translation_strings || '')
      .replace('%%%%', settingsContent.default_language || '')

    const migrationName = `${getMigrationKey()}-settings-translations-update.js`
    fs.writeFileSync(`${cwd}/extensions/migrations/${migrationName}`, migrationContent)

    console.log(`Creata migration per translations: ${migrationName}`)
  } catch (err) {
    console.error(err.message)
  } finally {
    knex && knex.client.pool.destroy()
  }
}
