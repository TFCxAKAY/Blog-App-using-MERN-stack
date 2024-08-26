
const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ email: user.email, profileImage: user.profileImage });
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving dashboard data' });
  }
});

module.exports = router;
