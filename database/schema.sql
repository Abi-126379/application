-- database/schema.sql
-- Schema for the registration form application.
-- This runs automatically the first time the backend starts (via SQLite),
-- but you can also run it manually against the users table shown below.

CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT NOT NULL,
    mobile_no     TEXT NOT NULL UNIQUE,
    email         TEXT NOT NULL UNIQUE,
    address       TEXT NOT NULL,
    password_hash TEXT NOT NULL,          -- bcrypt hash, never plain text
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- MySQL / MariaDB equivalent, in case you swap the driver later
-- (see database/README.md for the two-line change needed in backend/config/db.js):
--
-- CREATE DATABASE IF NOT EXISTS form_app;
-- USE form_app;
--
-- CREATE TABLE IF NOT EXISTS users (
--     id            INT AUTO_INCREMENT PRIMARY KEY,
--     name          VARCHAR(100) NOT NULL,
--     mobile_no     VARCHAR(15)  NOT NULL UNIQUE,
--     email         VARCHAR(150) NOT NULL UNIQUE,
--     address       TEXT         NOT NULL,
--     password_hash VARCHAR(255) NOT NULL,
--     created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
