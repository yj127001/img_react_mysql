import express from 'express';
import { config } from './db/config.js';
import Database from './db/database.js';

// Import App routes
import image from './model/image.js';
// import openapi from './db/opanapi.js';

const port = process.env.PORT || 8080;

const app = express();

// Development only - don't do in production
// Run this to create the table in the database
if (process.env.NODE_ENV === 'development') {
  const database = new Database(config);
  database
    .executeQuery(
        `CREATE TABLE Image (id int NOT NULL IDENTITY, content varbinary(max));`
    //   `CREATE TABLE Person (id int NOT NULL IDENTITY, firstName varchar(255), lastName varchar(255));`
    )
    .then(() => {
      console.log('Table created');
    })
    .catch((err) => {
      // Table may already exist
      console.error(`Error creating table: ${err}`);
    });
}

// Connect App routes
// app.use('/api-docs', openapi);
// app.use('/persons', person);
app.use('/upload', image);
// app.use('*', (_, res) => {
//   res.redirect('/api-docs');
// });

app.use(express.static('public'))

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});