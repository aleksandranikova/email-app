const keys = require('../config/keys');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
},
    async (accessToken, refreshToken, profile, done) => {
        const res = await User.findOne({ googleId: profile.id });
        if (res) {
            return done(null, res);
        }
        const newUser = new User({ googleId: profile.id }).save();
        done(null, newUser);
    }
));