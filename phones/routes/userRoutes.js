const express = require('express');
const User = require('../model/userModel.js');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res)=>{
    res.render('auth/login');
});

router.get('/signup', (req, res)=>{
    res.render('auth/signup');
});

router.get('/register', (req, res)=>{
    res.render('auth/signup');
});

router.post("/register", async(req, res)=>{
    const {email, password, isFaculty, aadharNumber, phoneNumber, gender} = req.body;

    try {
        const user = new User({email,  isFaculty, aadharNumber, phoneNumber, gender});
        await User.register(user, password);
        req.flash("success", "Registration successful. You can now log in.");
        res.redirect('/login');
    } catch (error) {
        req.flash("error", "Registration failed. Please try again.");
        res.redirect('/register');
    }
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect('/product');
});

router.post('/logout', function(req, res){
    req.logout();
    req.flash("success", "Logged out successfully.");
    res.redirect('/login');
});

module.exports = router;
