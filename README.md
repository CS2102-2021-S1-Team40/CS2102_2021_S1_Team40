# CS2102_AY2021_S1_Group 40 Pet Caring

CS2102 Database Systems: Introduction to Web Application Development

This is a project done by a group of students from the National University of Singapore for the module
CS2102: Database Systems.

The following contains mainly setup instructions. Refer to our [Project Report](Project%20Report.pdf) for more details.

Project Demo Video: https://www.youtube.com/watch?v=BZTjCrFfHSA&feature=youtu.be

Team Members:

- Caijie
- Michelle
- Phoebe
- Sheryl
- Wei Kiat

Tech Stack:

- Frontend: React, Material-UI
- Backend: Node.js, Express
- Database: PostgreSQL

## Heroku

We use Heroku to host both our Frontend and Backend.

Frontend: https://cs2102petlovers.herokuapp.com

Backend: https://cs2102petloversapi.herokuapp.com

To access the hosted database:

1. Install heroku-cli
2. `heroku login`. Contact us for access rights!
3. If you want to run a single sql command: `echo "<sqlcommand>" | heroku pg:psql`
4. If you want to run a batch file: `cat <filepath> | heroku pg:psql`

## Continuous Integration/Deployment [![Build Status](https://travis-ci.com/CS2102-2021-S1-Team40/CS2102_2021_S1_Team40.svg?branch=master)](https://travis-ci.com/CS2102-2021-S1-Team40/CS2102_2021_S1_Team40)

We use Travis to continuously integrate, test and deploy our Javascript changes.

## Setup Locally

1. Make sure you have node and npm installed. The quickest way is to use homebrew and do `brew install node`.
2. `npm install` to install all dependencies
3. Create a local instance of postgreSQL database.
   1. Make sure you have postgres installed. `brew install postgresql`.
   2. Start postgres server. `brew services start postgresql` or `brew services restart postgresql`
   3. Create a database. `createdb <dbname>` (Drop database by `dropdb <dbname>`)
   4. Load the build schema. `psql -d <dbname> < build-schema.sql`
   5. Load the dataset. `psql -d <dbname> < add-data.sql`
4. Create a `.env` file in the project root and specify the `DATABASE_URL` like this: `DATABASE_URL="postgresql://<dbuser>:<dbpassword>@localhost:5432/<dbname>"`.
5. `npm start`. This should run the api on port 8080 by default.

Tips:

1. You can do `psql -d <dbname>` to enter into your database cmd and execute SQL queries directly there.
2. In your database cmd after you do step 1, you can do `\l` to see all your databases and `\d` to see all your tables.

## Lint checking with Prettier

Do `npm run prettier` in project root to auto format all your code nicely!

## Setup frontend locally

1. `cd public` from project root. This is the folder containing the React app.
2. If you are running the API locally, you need to change the `API_HOST` in `consts.js` to your locally running API instance URL.
3. Refer to the [README](public/README.md) inside `public` for further instructions.

Note: We use different package managers: npm for back-end and yarn for front-end.
Don't do `npm install` for front-end! Similarly, don't do `yarn` for back-end!

