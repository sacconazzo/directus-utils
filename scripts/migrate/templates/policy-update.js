const policies = JSON.parse('%%%%')

module.exports = {
  async up(knex) {
    const [setPolicy] = await knex('directus_policies').select().where('id', '$$$$')
    return setPolicy
      ? knex('directus_policies').update(policies).where('id', '$$$$')
      : knex('directus_policies').insert(policies)
  },

  async down(knex) {
    return true
  },
}
