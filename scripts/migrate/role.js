const fs = require('fs')
const root = require('find-root')()
const cwd = process.cwd()
const Knex = require('knex')
const { getMigrationKey } = require('./index')

const { db: dbConfig, migrationPath } = require('../config')

module.exports = async (role) => {
  let knex
  try {
    knex = Knex(dbConfig)

    if (role === 'public') {
      role = null
    } else {
      const [roleContent] = await knex('directus_roles').select().where({ id: role })
      if (!roleContent) throw new Error('Role not valid')

      const tamplateContent = fs.readFileSync(`${root}/scripts/migrate/templates/role-update.js`, 'utf8')

      const migrationContent = tamplateContent.replaceAll('$$$$', role).replace('%%%%', JSON.stringify(roleContent))

      const migrationName = `${getMigrationKey()}-role-update.js`
      fs.writeFileSync(`${cwd}/${migrationPath}/${migrationName}`, migrationContent)

      console.log(`Migration created for role ${role}: ${migrationName}`)
    }

    const accessContent = await knex('directus_access').select().where({ role })

    const tamplateAContent = fs.readFileSync(`${root}/scripts/migrate/templates/access-update.js`, 'utf8')

    const migrationAContent = tamplateAContent.replace('$$$$', role).replace('%%%%', JSON.stringify(accessContent))

    const migrationAName = `${getMigrationKey()}-access-update.js`
    fs.writeFileSync(`${cwd}/${migrationPath}/${migrationAName}`, migrationAContent)

    console.log(`Migration created for permissions: ${migrationAName}`)
  } catch (err) {
    console.error(err.message)
  } finally {
    knex && knex.client.pool.destroy()
  }
}
