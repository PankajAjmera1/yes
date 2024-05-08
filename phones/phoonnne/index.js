const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const phoneRoutes = require('./routes/phoneRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const app = express();
const port = 3000;
const dbConnect = require("./db/db.js");
const ejsmate = require('ejs-mate');
const ejs = require('ejs');





app.engine('ejs', ejsmate);
app.set("view engine", "ejs");
app.set("views", "views")

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

dbConnect();

app.use(phoneRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});