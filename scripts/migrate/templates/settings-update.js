const settings = JSON.parse('%%%%')
delete settings.id

module.exports = {
  up: async knex => {
    const setSettings = await knex('directus_settings').select().first()
    return setSettings
      ? await knex('directus_settings').update(settings).where('id', setSettings.id)
      : await knex('directus_settings').insert(settings)
  },

  down: async knex => true,
}
