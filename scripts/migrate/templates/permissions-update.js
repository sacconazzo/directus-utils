const permissions = JSON.parse('%%%%')
permissions.forEach(p => {
  p.permissions = p.permissions ? JSON.stringify(p.permissions) : null
  p.validation = p.validation ? JSON.stringify(p.validation) : null
  p.presets = p.presets ? JSON.stringify(p.presets) : null
  delete p.id
})

module.exports = {
  up: async knex => {
    const role = '$$$$'
    await knex('directus_permissions')
      .delete()
      .where('role', role !== 'null' ? role : null)
    return permissions.length ? knex('directus_permissions').insert(permissions) : true
  },

  down: knex => true,
}
