# Directus utilities CLI

Utilities scripts for Directus projects:

- Automatic migrations (reading from your db and creating a migration for deployment)
  - roles
  - permissions
  - translations
- Batch updates (set common values on Directus tables)

## Prerequisites

Working in a Directus nodejs project

Ref: https://github.com/directus/directus

## Installation

```
npm install directus-x --save-dev
```

## Setup

Basically DB ref. on your local `.env` file for variables:

- `DB_CLIENT`
- `DB_HOST`
- `DB_DATABASE`
- `DB_USER`
- `DB_PASSWORD`
- `DB_PORT`

Otherwise you can create the `directus-utils.js` file in the root of your project as in the example:

```
module.exports = {
  db: {
    client: 'mysql',
    connection: {
      user: 'root',
      password: 'password',
      database: 'directus',
      host: 'localhost',
      port: 3306,
    },
  },
  options: {
    module: false, // enables ES module standard
  },
}
```

## Using

Guide for list of commands:

```
npx directus-x --help
```

Example to create a migration for the public role

```
npx directus-x migrate --role public
```

Example to create a migration for a specific role (XXX)

```
npx directus-x migrate -r XXX
```

Example to create a migration for translations strings

```
npx directus-x migrate --translations
```

Example to update WYSIWYG options for all project fields

```
npx directus-x batch fields-options -k "interface = 'input-rich-text-html'" -d '{"toolbar": ["bold", "bullist", "italic", "numlist", "underline"]}'
```
