const fs = require('fs')
const root = require('find-root')()
const Knex = require('knex')
const { getMigrationKey } = require('./index')

const { db: dbConfig, options, migrationPath } = require('../config')

module.exports = async () => {
  let knex
  try {
    knex = Knex(dbConfig)

    const filesContent = await knex('directus_files').select()

    const tamplateContent = fs.readFileSync(
      `${root}/scripts/migrate/templates/files-update${options.module ? '-es' : ''}.js`,
      'utf8',
    )

    const migrationContent = tamplateContent.replace('%%%%', JSON.stringify(filesContent))

    const migrationName = `${getMigrationKey()}-files-update.js`
    fs.writeFileSync(`${migrationPath}/${migrationName}`, migrationContent)

    console.log(`Creata migration per files: ${migrationName}`)
    console.warn(`\n>>> Remember to also migrate the original binary bucket content <<<\n`)
  } catch (err) {
    console.error(err)
  } finally {
    knex && knex.client.pool.destroy()
  }
}
