require('dotenv').config()

const { Command } = require('commander')
const program = new Command()
const { migrate } = require('./migrate')

program.name('string-util').description('Directus utilities').version('1.0.0')

program
  .command('migrate')
  .description('Create migration for a specific entity (upsert mode)')
  .option('-r, --role <uuid>|public', 'migrate a role (with all related permissions)')
  .option('-t, --translations', 'migrate translation keys')
  .action(migrate)

program.parse()
