var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var users = require('../db/models/users');


// expose this function to our app using module.exports
module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    // Passwort Strategie die verwendet werden soll um Nutzer zu Authentifizieren
    // TODO: Add Database call for local Storage of user Data
    passport.use('local-signup', new LocalStrategy(
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
};