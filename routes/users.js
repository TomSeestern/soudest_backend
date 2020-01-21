var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Für den Login:
var database = require('../db/db');
var users = database.sequelizeInstance.import('../db/models/users');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Passwort Strategie die verwendet werden soll um Nutzer zu Authentifizieren
// TODO: Add Database call for local Storage of user Data
passport.use(new LocalStrategy(
    function (username, password, done) {
        // Später erfolgt hier ein Datenbank-Call. Hier nun zur Demo nur ein Nutzer:
        if ((username === "Hans") && (password === "1234")) {
            // User /Pwd  stimmt
            return done(null, {name: "Hans", roleAdmin: 1, roleUser: 1});
        } else {
            // User / Pwd falsch
            return done(null, false);
        }
    }
));

// Login über Post der HTML Form
router.post('/login', function (req, res, next) {
    var day = 60000 * 60 * 24;
    req.session.cookie.expires = new Date(Date.now() + day);
    req.session.cookie.maxAge = day;
    passport.authenticate('local', {
        session: true,
        successRedirect: '/info', // hier gibt man die Seite ein, die bei Erfolg aufgerufen werden soll
        failureRedirect: '/login'  // zurück zum Login!
    })(req, res, next)
});

router.get('/signup', function (req, res, next) {
    res.render('signup');
});

// TODO: Add Logic for Registering Users
router.post('/signup', function (req, res, next) {
    console.log(req.body);
    var firstName = req.body.firstName || '';
    var lastName = req.body.lastName || '';
    var email = req.body.email || '';
    var password = req.body.password || '';

    var newUser = users.build({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    });

    newUser.save().catch(function (error) {
        console.log('Error while inserting: ' + error.stack);
    });
    res.json({"info": "Neu angelegt"});
});

// Logout über Post der /user/logout Route
router.get('/logout', function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
});

// get Login Page
router.get('/', function (req, res, next) {
    res.render('login');
});

module.exports = router;
