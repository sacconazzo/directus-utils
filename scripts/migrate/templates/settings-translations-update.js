const settings = {
  translation_strings: '$$$$' || null,
  default_language: '%%%%',
}

module.exports = {
  up: async knex => {
    const setSettings = await knex('directus_settings').select().first()
    return setSettings
      ? knex('directus_settings').update(settings).where('id', setSettings.id)
      : knex('directus_settings').insert(settings)
  },

  down: async knex => {
    return true
  },
}
