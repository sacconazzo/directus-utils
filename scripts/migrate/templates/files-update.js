const files = JSON.parse('%%%%')

module.exports = {
  up: async knex => {
    const existingIds = new Set(await knex('directus_files').pluck('id'))

    for (const file of files) {
      if (existingIds.has(file.id)) {
        await knex('directus_files').where('id', file.id).update(file)
      } else {
        await knex('directus_files').insert(file)
      }
    }
  },

  down: knex => true,
}
