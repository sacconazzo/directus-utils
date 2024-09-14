const uuid = require('uuid')

const access = JSON.parse('%%%%')
access.forEach(p => {
  p.id = uuid.v4()
})

module.exports = {
  up: async knex => {
    const role = '$$$$'
    await knex('directus_access')
      .delete()
      .where('role', role !== 'null' ? role : null)
    return access.length ? knex('directus_access').insert(access) : true
  },

  down: async knex => true,
}
