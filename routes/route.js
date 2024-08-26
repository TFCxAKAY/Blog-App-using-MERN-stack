
const express = require('express');
const multer = require('multer');
const User = require('../models/User')
const jwt=require("jsonwebtoken");
require("dotenv").config();
const bcrypt=require('bcryptjs')

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/signup', upload.single('profileImage'), async (req, res) => {
  try {
    const { email, password } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const user = new User({
      email,
      password,
      profileImage
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
});
router.post('/login', async (req, res) => {
    try {
      const  email   = req.body.email;
      const password=req.body.password;
     
  
      
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
    
      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
     
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
  
      res.json({ token, message: 'Login successful' });
    } catch (error) {
      res.status(400).json({ error: 'Error logging in' });
    }
  });
  


module.exports = router;

