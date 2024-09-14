const access = JSON.parse('%%%%')
access.forEach(p => {
  delete p.id
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