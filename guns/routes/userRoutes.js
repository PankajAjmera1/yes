const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const passport = require('passport');

//HOME ROUTE
router.get('/', (req, res) => {
    res.render('guns/landing');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/register', async (req, res) => {
    const { username, email, password, age, phoneNumber, gender } = req.body;

    try {
        const newUser = new User({ username ,email, age, phoneNumber, gender });
        await User.register(newUser, password);
        req.flash("success", "Registration successful. You can now log in.");
        res.redirect('/login');
    } catch (err) {
        req.flash("error", err.message);
        res.redirect('/signup');
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/gun',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/logout', (req, res) => {
    req.logout(() => {
        req.flash("success", "Logged out successfully.");
        res.redirect('/login');
    });
});


module.exports = router;
