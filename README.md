# Directus utilities CLI

Utilities scripts for Directus projects:

- Automatic migrations (reading from your db and creating a migration for deployment)
  - roles
  - permissions
  - translations
- ...

## Prerequisites

Working in a Directus nodejs project

Ref: https://github.com/directus/directus

## Installation

    npm install directus-x --save-dev

## Using

Guide for list of commands:

    npx directus-x --help

Example to create a migration for the public role

    npx directus-x migrate --role public

Example to create a migration for a specific role (XXX)

    npx directus-x migrate -r XXX

Example to create a migration for translations settings

    npx directus-x migrate --translations
