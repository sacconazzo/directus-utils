const Knex = require('knex')

const { db: dbConfig } = require('../config')

module.exports = async (table, field, condition, data) => {
  let knex
  try {
    knex = Knex(dbConfig)

    const update = data || null

    const n =
      condition !== 'all'
        ? await knex(table).where(knex.raw(condition)).update(field, update)
        : await knex(table).update(field, update)

    console.log(`Table '${table}' updated with ${n} records`)

    console.warn('Remember to generate a new snapshot')
  } catch (err) {
    console.error(err.message)
  } finally {
    knex && knex.client.pool.destroy()
  }
}
