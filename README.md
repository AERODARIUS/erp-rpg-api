# :notebook_with_decorative_cover: ERP-RPG API

## API for skills management software.

It handles employee data as RPG character stats.

## Features checklist

- User CRUD (Users are employees)
  - Oauth / Login
  - Basic information about the users :construction:
  - Hard and soft skills information as they were character stats
  - Technology preferences for each employee
  - Projects they were involved with (as participant or collaborator)
  - Performance review data (save as a history)
  - Access level for its own data and data for other users
  - Also adding information for candidates outside the company, it’d be a user with the checkbox candidate and with restricted access for the platform
- Report generator
  - Automatic resume generator
  - Stats generator (Experience with technologicharacter
- Search engine: Algorithm for selecting the best candidate for a job position or project
- Google Drive integration for attachments and exports
- Ranking lists
  - Generate points for each employee for each existing role
  - Ranking list for each role
  - Unique ranking list for the hole company, the ranking position will depend on the role that each employee selected

**Reference:**\
:construction: In Progress features\
:checkered_flag: Released features

## Project setup

    npm install

Setup MongoDB Server, follow these steps: https://github.com/mongodb/node-mongodThis API uses _URI Versioning_, any request to a resource should be performed under `/api/v{vesrion-number}/` path, for example: `/api/v1/users/`. By default, the path `/api/` stands for the latest version. For now, there is only version 1.b-native#start-a-mongodb-server

Add an `.env` file to the root of the project with the following content:

```Shell
# Mongo DB
# May vary, depending on the configuration chosen on the previous step

# Local development
MONGODB_URI='mongodb://localhost/erp-rpg'

# Port
PORT=27017
```

## Seeding [WIP]

Open a terminal execute `mongo` command, then run the following:

    use erp-rpg
    db.users.insert({"nickname" : "admin"})

## Running the project locally

```Shell
npm start

# Start development server with recompile option after detecting changes
npm run start-dev
```

## Accessing the API

This API uses _URI Versioning_, any request to a resource should be performed under `/api/v{vesrion-number}/` path, for example: `/api/v1/users/`. By default, the path `/api/` stands for the latest version. For now, there is only version 1, so accessing `/api/` should be the same as accessing `/api/v1/`.

### Documentation for completed features

- **[Users](docs/users.md)**

## Testing the project

    npm test
