const express = require('express');
const passport = require('passport');
const User = require('../models/user.js');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res) => {
  const { username, phoneNumber, gender, monthlyIncome, password } = req.body;
  const user = new User({ username, phoneNumber, gender, monthlyIncome });
  await User.register(user, password);
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }));


// Logout route
router.post('/logout', function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "Logged out successfully");
        res.redirect('/');
    });
});

module.exports = router;