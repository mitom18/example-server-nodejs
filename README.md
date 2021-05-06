# Example Node.js server

Implementation of example backend application written in TypeScript powered by Express running on Node.js.

## Features

 - Database connection (MySQL)
 - ORM
 - HTTP REST API
 - Logger
 - Authentication

## Usage

Application requires MySQL database. Ensure you have access to a MySQL database server. You can initialize the database with `db_init.sql` script. Database contains user with credentials `admin@admin.com` / `password`.

To run this application, you'll need [Node.js](https://nodejs.org/en/) (which comes with [npm](https://www.npmjs.com/)) installed on your computer.

Then from your command line:

```
# Install dependencies
npm install

# Run the app
npm run start:dev

# Or build the production version
npm build

# Or build and run the production version
npm start
```

## Built With

 - [Node.js](https://nodejs.org/en/)
 - [TypeScript](https://www.typescriptlang.org/)
 - [Express](https://expressjs.com/)
 - [TypeORM](https://typeorm.io/#/)
 - [Winston](https://github.com/winstonjs/winston)
 - [JWT](https://jwt.io/)

## Licence

MIT