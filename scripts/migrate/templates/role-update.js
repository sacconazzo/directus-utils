const role = JSON.parse('%%%%')

module.exports = {
  async up(knex) {
    const [setRole] = await knex('directus_roles').select().where('id', '$$$$')
    return setRole ? knex('directus_roles').update(role).where('id', '$$$$') : knex('directus_roles').insert(role)
  },

  async down(knex) {
    return true
  },
}
