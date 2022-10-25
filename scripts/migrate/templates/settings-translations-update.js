const settings = {
  translation_strings: '$$$$',
  default_language: '%%%%',
}

module.exports = {
  async up(knex) {
    const [setSettings] = await knex('directus_settings').select().where('id', 1)
    return setSettings
      ? knex('directus_settings').update(settings).where('id', 1)
      : knex('directus_settings').insert(settings)
  },

  async down(knex) {
    return true
  },
}
