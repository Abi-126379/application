# Registration Form App

A simple full-stack form app collecting **name, mobile number, email,
address, and password**, split into three folders:

```
form-app/
├── frontend/    HTML, CSS, JS (plain, no framework)
├── backend/     Node.js + Express API
└── database/    SQLite schema (auto-created on first run)
```

## How it works

- The **frontend** is a single page with a Register tab and a Login tab.
  It validates input in the browser, then calls the backend API.
- The **backend** exposes three endpoints under `/api/users`:
  - `POST /register` — creates a user (password is hashed with bcrypt,
    never stored in plain text)
  - `POST /login` — checks email + password
  - `GET /` — lists registered users (no passwords included)
- The **database** is SQLite, stored as a single file
  (`database/form_app.sqlite`), created automatically from
  `database/schema.sql` the first time you start the server. No separate
  database install or setup needed. (See `database/README.md` if you'd
  rather switch to MySQL.)

## Running it

```bash
cd backend
npm install
npm start
```

Then open **http://localhost:5000** in your browser — the backend also
serves the frontend, so that one URL is all you need. (Everything runs
on port 5000 by default; set the `PORT` environment variable to change it.)

## Notes

- Mobile number must be exactly 10 digits; email must be a valid format;
  password must be at least 6 characters — enforced both in the browser
  and on the server.
- Email and mobile number are unique — duplicate registrations are rejected.
