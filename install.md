<h1 align="center"> Installation Instruction </h1> <br>

## Table of Contents

- [Database](#Database)
- [NodeJS](#nodejs)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Database
- Download MySQL Workbench here: https://dev.mysql.com/downloads/workbench/.
- Follow default install instructions.
- When prompted to set up a password to the "root" account, enter: 'password'.
- Open MySQL Workbench and create a new local connection.
- Feel free to use an existing connection, you can change the database credentials in main/src/server/db/sql.js.
- Navigate to main/src/server/db/tables.sql
- Do not attempt to run this file with npm commands. 
- Instead, copy the contents of tables.sql and paste into Workbench.
- Run the script
- Congrats! You have successfully set up your MySQL Database.

## NodeJS 
- Visit the NodeJS website to install both NodeJS and NPM onto your machine: https://nodejs.org/en/download/.
- Clone this repository to a location on your machine.
- Run `npm install` from the `main` file directory of the project to install the required dependancies.
- Run `npm run dev` to run the NodeJS backend app.
- Run `npm start` to run the React app.
- Go to http://localhost:3000 to view the app.
