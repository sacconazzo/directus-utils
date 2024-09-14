const translations = JSON.parse('%%%%')

module.exports = {
  up: async knex => {
    await knex('directus_translations').delete()
    return translations.length ? knex('directus_translations').insert(translations) : true
  },

  down: async knex => true,
}
