const translations = JSON.parse('%%%%')

export default {
  async up(knex) {
    await knex('directus_translations').delete()
    return translations.length ? knex('directus_translations').insert(translations) : true
  },

  down(knex) {
    return true
  },
}
