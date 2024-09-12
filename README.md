# Directus utilities CLI

Utilities scripts for Directus 11 (or latest) projects:

- Automatic migrations (reading from your db and creating a migration for deployment)
  - **policies** (with permission rules)
  - **roles** (with associated policy relationship attributes - policy migration needed first)
  - **translations** (transations table)
- Batch updates (set common values on Directus tables)

## Prerequisites

Working in a Directus nodejs project

Ref: https://github.com/directus/directus

## Installation

    npm install directus-x --save-dev

## Using

Guide for list of commands:

    npx directus-x --help

Example to create a migration for a specific policy (AAA)

    npx directus-x migrate --policy AAA

Example to create a migration for the public role

    npx directus-x migrate --role public

Example to create a migration for a specific role (XXX)

    npx directus-x migrate -r XXX

Example to create a migration for translations strings

    npx directus-x migrate --translations

Example to update WYSIWYG options for all project fields

    npx directus-x batch fields-options -k "interface = 'input-rich-text-html'" -d '{"toolbar": ["bold", "bullist", "italic", "numlist", "underline"]}'
