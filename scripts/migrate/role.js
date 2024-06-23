const fs = require('fs')
const root = require('find-root')()
const Knex = require('knex')
const { getMigrationKey } = require('./index')

const { db: dbConfig, options, migrationPath } = require('../config')

module.exports = async role => {
  let knex
  try {
    knex = Knex(dbConfig)

    if (role === 'public') {
      role = null
    } else {
      const [roleContent] = await knex('directus_roles').select().where({ id: role })
      if (!roleContent) throw new Error('Ruolo non valido')

      const tamplateContent = fs.readFileSync(
        `${root}/scripts/migrate/templates/role-update${options.module ? '-es' : ''}.js`,
        'utf8',
      )

      const migrationContent = tamplateContent.replaceAll('$$$$', role).replace('%%%%', JSON.stringify(roleContent))

      const migrationName = `${getMigrationKey()}-role-update.js`
      fs.writeFileSync(`${migrationPath}/${migrationName}`, migrationContent)

      console.log(`Creata migration per ruolo ${role}: ${migrationName}`)
    }

    const permissionContent = await knex('directus_permissions').select().where({ role })
    permissionContent.forEach(p => {
      if (typeof p.permissions !== 'object') p.permissions = JSON.parse(p.permissions)
      if (typeof p.validation !== 'object') p.validation = JSON.parse(p.validation)
      if (typeof p.presets !== 'object') p.presets = JSON.parse(p.presets)
    })

    const tamplatePContent = fs.readFileSync(
      `${root}/scripts/migrate/templates/permissions-update${options.module ? '-es' : ''}.js`,
      'utf8',
    )

    const migrationPContent = tamplatePContent.replace('$$$$', role).replace('%%%%', JSON.stringify(permissionContent))

    const migrationPName = `${getMigrationKey()}-permissions-update.js`
    fs.writeFileSync(`${migrationPath}/${migrationPName}`, migrationPContent)

    console.log(`Creata migration per permissions: ${migrationPName}`)
  } catch (err) {
    console.error(err)
  } finally {
    knex && knex.client.pool.destroy()
  }
}
