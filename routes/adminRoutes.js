const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();
const secret = process.env.SECRET;

// Admin Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ error: 'Invalid username or password' });

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role }, // Include admin's role in the token
      secret, // Replace with a secure environment variable in production
      { expiresIn: '1h' }
    );

    // Send token as an HTTP-only cookie
    res
      .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' })
      .json({ message: 'Logged in successfully', role: admin.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Setup Route (Create Admin User - Run once)
router.post('/setup', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Hash the provided password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin instance
    const newAdmin = new Admin({ username, password: hashedPassword, role });

    // Save the admin in the database
    await newAdmin.save();
    res.json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
