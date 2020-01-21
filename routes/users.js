var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportJWT = require('passport-jwt');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

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

        users.authenticate()
        /*
        // Später erfolgt hier ein Datenbank-Call. Hier nun zur Demo nur ein Nutzer:
        if ((username === "Hans") && (password === "1234")) {
            // User /Pwd  stimmt
            return done(null, {name: "Hans", roleAdmin: 1, roleUser: 1});
        } else {
            // User / Pwd falsch
            return done(null, false);
        }*/
    }
));

// Login über Post der HTML Form
router.post('/login', async function (req, res, next) {
    const {email, password} = req.body;
    if (email && password) {
        // we get the user with the name and save the resolved promise
        let user = await users.getUser({email});
        if (!user) {
            res.status(401).json({msg: 'No such user found', user});
        }
        if (user.password === password) {
            // from now on we’ll identify the user by the id and the id is
            // the only personalized value that goes into our token
            let payload = {id: user.id};
            let token = jwt.sign(payload, "damnmysecretisnotsecret");
            res.json({msg: 'ok', token: token});
        } else {
            res.status(401).json({msg: 'Password is incorrect'});
        }
    }
});

router.get('/users', function (req, res) {
    users.getAllUsers().then(user => res.json(user));
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

// protected route
router.get('/protected', passport.authenticate('jwt', {session: false}), function (req, res) {
    res.json({msg: 'Congrats! You are seeing this because you are authorized'});
});

// get Login Page
router.get('/', function (req, res, next) {
    res.render('login');
});

module.exports = router;
