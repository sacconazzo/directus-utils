const role = JSON.parse('%%%%')

module.exports = {
  up: async knex => {
    const [setRole] = await knex('directus_roles').select().where('id', '$$$$')
    return setRole ? knex('directus_roles').update(role).where('id', '$$$$') : knex('directus_roles').insert(role)
  },

  down: async knex => true,
}
