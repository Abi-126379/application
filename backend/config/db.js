// backend/config/db.js
// Sets up the SQLite connection and makes sure the users table exists.

const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, '..', '..', 'database', 'form_app.sqlite');
const SCHEMA_PATH = path.join(__dirname, '..', '..', 'database', 'schema.sql');

const db = new Database(DB_PATH);

// Run the CREATE TABLE statement (the first statement in schema.sql) on startup.
const schemaSql = fs.readFileSync(SCHEMA_PATH, 'utf8');
const createTableStatement = schemaSql.split(';')[0] + ';';
db.exec(createTableStatement);

module.exports = db;
