const upd = require(`./update-field`)

const entities = {
  fields: 'directus_fields',
  folders: 'directus_folders',
}

module.exports = {
  batch: async (entity, options) => {
    const [key, field] = entity.split('-')
    const table = entities[key]

    if (!table) throw new Error(`Entity ${key} not allowed`)

    upd(table, field, options.key, options.data)
  },
}
