const policies = JSON.parse('%%%%')

module.exports = {
  up: async knex => {
    const [setPolicy] = await knex('directus_policies').select().where('id', '$$$$')
    return setPolicy
      ? knex('directus_policies').update(policies).where('id', '$$$$')
      : knex('directus_policies').insert(policies)
  },

  down: async knex => true,
}
