import uuid from 'uuid'

const access = JSON.parse('%%%%')
access.forEach(p => {
  p.id = uuid.v4()
})

module.exports = {
  async up(knex) {
    const role = '$$$$'
    await knex('directus_access')
      .delete()
      .where('role', role !== 'null' ? role : null)
    return access.length ? knex('directus_access').insert(access) : true
  },

  async down(knex) {
    return true
  },
}
