# ERP-RPG API

## API for skills management software.

It handles employee data as an RPG character stats.


## Features checklist:

- User CRUD (Users are employees)
  - Oauth / Login
  - Basic information about the users
  - Hard and soft skills information as they were character stats
  - Technology preferences for each employee
  - Projects they were involved with (as participant or collaborator)
  - Performance review data (save as a history)
  - Access level for its own data and data for other users
  - Also adding information for candidates outside the company, it’d be a user with the checkbox candidate and with restricted access for the platform
- Report generator
  - Automatic resume generator
  - Stats generator (Experience with technologies, projects stats, etc.)
  - Extend stats generator for projects, the entire company, or any group of people
  - Ability to export it as a PDF or word
- Search engine: Algorithm for selecting the best candidate for a job position or project
- Google Drive integration for attachments and exports
- Ranking lists
  - Generate points for each employee for each existing role
  - Ranking list for each role
  - Unique ranking list for the hole company, the ranking position will depend on the role that each employee selected


## Project setup

Run `npm install`

Setup MongoDB Server, follow these steps: https://github.com/mongodb/node-mongodb-native#start-a-mongodb-server

Add an **.env** file to the root of the project with the following content:

    # Mongo DB
    # May vary, depending on the configuration chosen on the previous step

    # Local development
    MONGODB_URI='mongodb://localhost/erp-rpg'

    # Port
    PORT=27017


## Seeding [WIP]

Open a terminal execute `mongo` command, then run the following:

    use erp-rpg
    db.users.insert({"name" : "admin"})


## Running the project locally

Run `npm start`
