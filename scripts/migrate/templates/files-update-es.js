const files = JSON.parse('%%%%')

files.forEach(f => {
  delete f.modified_by
  delete f.uploaded_by
})

export default {
  async up(knex) {
    const existingIds = new Set(await knex('directus_files').pluck('id'))

    for (const file of files) {
      if (existingIds.has(file.id)) {
        await knex('directus_files').where('id', file.id).update(file)
      } else {
        await knex('directus_files').insert(file)
      }
    }
  },

  async down(knex) {
    return true
  },
}
