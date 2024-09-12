const role = JSON.parse('%%%%')

export default {
  async up(knex) {
    const [setRole] = await knex('directus_roles').select().where('id', '$$$$')
    return setRole ? knex('directus_roles').update(role).where('id', '$$$$') : knex('directus_roles').insert(role)
  },

  down(knex) {
    return true
  },
}
