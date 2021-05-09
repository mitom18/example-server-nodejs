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

# Run the app in development
npm run start:dev

# Build the production version
npm run build

# Build and run the production version
npm run start

# Compile the production bundle to executable binary
npm run compile
```

> **_IMPORTANT:_** When you run the executable binary, ensure you have the proper `.env` file in the same directory as the binary.

## Built With

 - [Node.js](https://nodejs.org/en/)
 - [TypeScript](https://www.typescriptlang.org/)
 - [Express](https://expressjs.com/)
 - [TypeORM](https://typeorm.io/#/)
 - [Winston](https://github.com/winstonjs/winston)
 - [Zod](https://github.com/colinhacks/zod)
 - [JWT](https://jwt.io/)
 - [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

## Performance

Performance tests and their results can be seen [here](https://github.com/mitom18/deno-vs-nodejs-autocannon#nodejs).

## Licence

MIT