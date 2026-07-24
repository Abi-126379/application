// backend/controllers/userController.js

const bcrypt = require('bcryptjs');
const db = require('../config/db');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[0-9]{10}$/;

function validateInput({ name, mobile_no, email, address, password }) {
  if (!name || !name.trim()) return 'Name is required.';
  if (!mobile_no || !MOBILE_RE.test(mobile_no)) return 'Mobile number must be exactly 10 digits.';
  if (!email || !EMAIL_RE.test(email)) return 'A valid email is required.';
  if (!address || !address.trim()) return 'Address is required.';
  if (!password || password.length < 6) return 'Password must be at least 6 characters.';
  return null;
}

// POST /api/users/register
function register(req, res) {
  const { name, mobile_no, email, address, password } = req.body;

  const validationError = validateInput({ name, mobile_no, email, address, password });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const existing = db
      .prepare('SELECT id FROM users WHERE email = ? OR mobile_no = ?')
      .get(email, mobile_no);

    if (existing) {
      return res.status(409).json({ error: 'A user with this email or mobile number already exists.' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const result = db
      .prepare(
        'INSERT INTO users (name, mobile_no, email, address, password_hash) VALUES (?, ?, ?, ?, ?)'
      )
      .run(name.trim(), mobile_no, email.trim().toLowerCase(), address.trim(), passwordHash);

    return res.status(201).json({
      message: 'User registered successfully.',
      user: { id: result.lastInsertRowid, name, mobile_no, email, address },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong while registering the user.' });
  }
}

// POST /api/users/login
function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.trim().toLowerCase());

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    return res.json({
      message: 'Login successful.',
      user: { id: user.id, name: user.name, mobile_no: user.mobile_no, email: user.email, address: user.address },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong while logging in.' });
  }
}

// GET /api/users
function listUsers(req, res) {
  try {
    const users = db
      .prepare('SELECT id, name, mobile_no, email, address, created_at FROM users ORDER BY created_at DESC')
      .all();
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong while fetching users.' });
  }
}

module.exports = { register, login, listUsers };
