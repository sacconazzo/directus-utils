const fs = require('fs')
const root = require('find-root')()
const Knex = require('knex')
const { getMigrationKey } = require('./index')

const { db: dbConfig, options, migrationPath } = require('../config')

module.exports = async () => {
  let knex
  try {
    knex = Knex(dbConfig)

    const translationsContent = await knex('directus_translations').select()

    const tamplateContent = fs.readFileSync(
      `${root}/scripts/migrate/templates/translations-update${options.module ? '-es' : ''}.js`,
      'utf8',
    )

    const migrationContent = tamplateContent.replace('%%%%', JSON.stringify(translationsContent))

    const migrationName = `${getMigrationKey()}-translations-update.js`
    fs.writeFileSync(`${migrationPath}/${migrationName}`, migrationContent)

    console.log(`Creata migration per translations: ${migrationName}`)
  } catch (err) {
    console.error(err.message || err.code || err)
  } finally {
    knex && knex.client.pool.destroy()
  }
}
