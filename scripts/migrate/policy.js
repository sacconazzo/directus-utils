const fs = require('fs')
const root = require('find-root')()
const cwd = process.cwd()
const Knex = require('knex')
const { getMigrationKey } = require('./index')

const { db: dbConfig, migrationPath } = require('../config')

module.exports = async (policy) => {
  let knex
  try {
    knex = Knex(dbConfig)

    const [policyContent] = await knex('directus_policies').select().where({ id: policy })
    if (!policyContent) throw new Error('Policy not valid')

    const tamplateContent = fs.readFileSync(`${root}/scripts/migrate/templates/policy-update.js`, 'utf8')

    const migrationContent = tamplateContent.replaceAll('$$$$', policy).replace('%%%%', JSON.stringify(policyContent))

    const migrationName = `${getMigrationKey()}-policy-update.js`
    fs.writeFileSync(`${cwd}/${migrationPath}/${migrationName}`, migrationContent)

    console.log(`Migration created for policy ${policy}: ${migrationName}`)

    const permissionContent = await knex('directus_permissions').select().where({ policy })
    permissionContent.forEach((p) => {
      p.permissions = JSON.parse(p.permissions)
      p.validation = JSON.parse(p.validation)
      p.presets = JSON.parse(p.presets)
    })

    const tamplatePContent = fs.readFileSync(`${root}/scripts/migrate/templates/permissions-update.js`, 'utf8')

    const migrationPContent = tamplatePContent
      .replace('$$$$', policy)
      .replace('%%%%', JSON.stringify(permissionContent))

    const migrationPName = `${getMigrationKey()}-permissions-update.js`
    fs.writeFileSync(`${cwd}/${migrationPath}/${migrationPName}`, migrationPContent)

    console.log(`Migration created for permissions: ${migrationPName}`)
  } catch (err) {
    console.error(err.message)
  } finally {
    knex && knex.client.pool.destroy()
  }
}
