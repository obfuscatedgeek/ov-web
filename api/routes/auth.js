const express = require('express');
const passport = require('passport');
const PinterestStrategy = require('passport-pinterest').Strategy;

const config = require('../../conf/env-config');

passport.use(new PinterestStrategy(
  {
    clientID: config.PINTEREST_CLIENT_ID,
    clientSecret: config.PINTEREST_CLIENT_SECRET,
    scope: ['read_public', 'read_relationships'],
    state: true,
    callbackURL: `${config.HOST}/api/auth/pinterest/callback`
  }, function (accessToken, refreshToken, profile, done) {
    return done(true, null);
  }
));

const router = express.Router();

router.get('/pinterest', passport.authenticate('pinterest'));

router.get('/pinterest/callback',
  passport.authenticate('pinterest',
    { failureRedirect: '/api/auth/pinterest/failure' }
  ),
  function (req, res) {
    console.log('>>> success redirection!!!');
    res.redirect('/');
  }
);

module.exports = router;
