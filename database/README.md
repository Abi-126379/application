# Database

This app uses **SQLite** by default so it runs with zero setup — no
separate database server to install or start. The database file
(`form_app.sqlite`) is created automatically inside this folder the
first time you start the backend, using `schema.sql` in this folder.

## Switching to MySQL (optional)

If you'd rather use MySQL:

1. `npm install mysql2` inside `backend/`.
2. Run the MySQL block at the bottom of `schema.sql` against your server.
3. Replace the contents of `backend/config/db.js` with a `mysql2` connection
   pool (host, user, password, database), and update the queries in
   `backend/controllers/userController.js` from the `better-sqlite3`
   synchronous style to `mysql2/promise` async/await calls — the SQL
   itself stays the same.
