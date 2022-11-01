const upd = require(`./update-field`)

const entities = {
  fields: 'directus_fields',
  folders: 'directus_folders',
  permissions: 'directus_permissions',
  users: 'directus_users',
  settings: 'directus_settings',
  roles: 'directus_roles',
  presets: 'directus_presets',
  files: 'directus_files',
  collections: 'directus_collections',
}

module.exports = {
  batch: async (entity, options) => {
    const [key, field] = entity.split('-')
    const table = entities[key]

    if (!table) throw new Error(`Entity ${key} not allowed`)

    upd(table, field, options.key, options.data)
  },
}
