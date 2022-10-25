const fs = require('fs')
const root = require('find-root')()
const Knex = require('knex')
const { getMigrationKey } = require('./index')

const { db: dbConfig } = require('../config')

module.exports = async (role) => {
  let knex
  try {
    knex = Knex(dbConfig)

    if (role === 'public') {
      role = null
    } else {
      const [roleContent] = await knex('directus_roles').select().where({ id: role })
      if (!roleContent) throw new Error('Ruolo non valido')

      const tamplateContent = fs.readFileSync(`${root}/scripts/migrate/templates/role-update.js`, 'utf8')

      const migrationContent = tamplateContent.replaceAll('$$$$', role).replace('%%%%', JSON.stringify(roleContent))

      const migrationName = `${getMigrationKey()}-role-update.js`
      fs.writeFileSync(`${root}/extensions/migrations/${migrationName}`, migrationContent)

      console.log(`Creata migration per ruolo ${role}: ${migrationName}`)
    }

    const permissionContent = await knex('directus_permissions').select().where({ role })
    permissionContent.forEach((p) => {
      p.permissions = JSON.parse(p.permissions)
      p.validation = JSON.parse(p.validation)
      p.presets = JSON.parse(p.presets)
    })

    const tamplatePContent = fs.readFileSync(`${root}/scripts/migrate/templates/permissions-update.js`, 'utf8')

    const migrationPContent = tamplatePContent.replace('$$$$', role).replace('%%%%', JSON.stringify(permissionContent))

    const migrationPName = `${getMigrationKey()}-permissions-update.js`
    fs.writeFileSync(`${root}/extensions/migrations/${migrationPName}`, migrationPContent)

    console.log(`Creata migration per permissions: ${migrationPName}`)
  } catch (err) {
    console.error(err.message)
  } finally {
    knex && knex.client.pool.destroy()
  }
}
