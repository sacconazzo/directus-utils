const settings = JSON.parse('%%%%')
delete settings.id

export default {
  async up(knex) {
    const setSettings = await knex('directus_settings').select().first()
    return setSettings
      ? await knex('directus_settings').update(settings).where('id', setSettings.id)
      : await knex('directus_settings').insert(settings)
  },

  down(knex) {
    return true
  },
}
