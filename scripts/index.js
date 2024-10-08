#!/usr/bin/env node

require('dotenv').config()

const { Command } = require('commander')
const program = new Command()
const { migrate } = require('./migrate')
const { batch } = require('./batch')

program.name('string-util').description('Directus utilities').version('2.0.0')

program
  .command('migrate')
  .description('Create migration for a specific entity (upsert mode)')
  .option('-p, --policy <uuid>', 'migrate a policy (including permissions)')
  .option('-r, --role <uuid>|public', 'migrate a role (including associated policy relationship attributes)')
  .option('-t, --translations', 'migrate translation keys')
  .option('-f, --files', 'migrate files table')
  .option('-s, --settings', 'migrate settings')
  .action(migrate)

program
  .command('batch')
  .description('Set automatic configurations or data to Directus tables')
  .argument('<entity>', 'Name of Directus entity-column to update (ex.: fields-options, files-folder, ..)')
  .option('-k, --key <condition>|all', 'Where condition of updating (ex.: "interface=\'input-rich-text-html\'")')
  .option(
    '-d, --data <data>',
    'Field content to be filled in batch (ex.: \'{"folder": null, "toolbar": ["blockquote", "bold", "bullist", "customImage", "fullscreen", "h1", "h2", "h3", "italic", "numlist", "underline"]}\')',
  )
  .action(batch)

program.parse()
