var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportJWT = require('passport-jwt');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var util = require('util');
const bcrypt = require("bcrypt-nodejs");
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

// get Login Page
router.get('/login', function (req, res, next) {
    res.render('login');
});
// Login über Post der HTML Form
router.post('/login', async function (req, res, next) {
    let email = req.body.email || '';
    let password = req.body.password || '';

    console.log("PW after Crypt: " + password);
    if (email && password) {
        // we get the user with the name and save the resolved promise
        let user = await users.getUser({email});
        if (!user) {
            res.status(401).json({msg: 'No such user found', user});
        }
        bcrypt.compare(password, user.password, function (err, match) {
            if (match) {
                // from now on we’ll identify the user by the id and the id is
                // the only personalized value that goes into our token
                let payload = {id: user.id, firstName: user.firstName};
                let token = jwt.sign(payload, "damnmysecretisnotsecret");
                res.cookie('jwt', token, {httpOnly: false, secure: false, session: true, maxAge: 3600000 * 60});
                res.redirect('http://localhost:3001/');
            } else {
                res.status(401).json({msg: 'Password is incorrect'});
            }
        });

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
        console.log('Error 8715: While inserting NEW User into DB: ' + error);
    });
    res.json({"info": "Neu angelegt"});
});

// Updates a exsiting User with new Data
router.put('/update', function (req, res, next) {
    console.log("INFO: Update Request recieved: " + util.inspect(req.body, false, null, true));
    var myid = req.body.myid || '';
    var firstName = req.body.firstName || '';
    var lastName = req.body.lastName || '';
    var email = req.body.email || '';

    users.update({
        id: myid,
        firstName: firstName,
        lastName: lastName,
        email: email,
    }, {
        where: {id: myid}
    }).catch(function (error) {
        console.log('Error 8716: While updating existing User into DB: ' + error);
    });
    res.redirect('http://localhost:3001/');
});

router.get('/:userId', function (req, res, next) {
    var userId = req.params.userId || -1;
    if (userId <= -1) {
        res.send("invalid id");
    }

    users.getUser({id: userId}).then(user => res.json(user)).catch(function (error) {
        console.log('Error 8717: While recieving existing User from DB: ' + error);
    });
    //res.json({"info": "User deleted"});
});

router.delete('/delete/:userId', function (req, res, next) {
    var userId = req.params.userId || -1;
    if (userId <= -1) {
        res.send("invalid id");
    }

    users.deleteUser({id: userId}).catch(function (error) {
        console.log('Error 8718: While deleting existing User from DB: ' + error);
    });
    res.json({"info": "User deleted"});
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
