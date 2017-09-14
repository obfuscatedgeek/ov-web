const express = require('express');
const passport = require('passport');
const PinterestStrategy = require('passport-pinterest').Strategy;
const request = require('superagent');
const co_express_router = require('co-express-router');

const config = require('../../conf/env-config');

const createUserFromPinterest = function ({profile, done}) {
  console.log('>>> creating user for pinterest!');

  const user = {
    username: profile.username,
    pinterest_id: profile.id,
    provider: 'pinterest',
    provider_url: profile.url,
    provider_profile_url: profile.profileUrl,
    display_name: profile.displayName,
    provider_bio: profile.bio
  }

  request.post(`${config.API}/v1/users`)
    .withCredentials()
    .send({user})
    .end((err, res) => {
      if (err) return done(null, false);

      const user = res.body && res.body.length !== 0 ? res.body[0] : null;

      console.log(res.body, '<<< this is the body', user);
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    });
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  try {
    request
      .get(`${config.API_URL}/v1/users`)
      .withCredentials()
      .query({pinterest_id: user.pinterest_id})
      .end((err, res) => {
        done(null, res.body);
      });
  } catch (err) {
    console.log('deserializing error');
    done(new Error('cant deserializing'));
  }
});

passport.use(new PinterestStrategy(
  {
    clientID: config.PINTEREST_CLIENT_ID,
    clientSecret: config.PINTEREST_CLIENT_SECRET,
    scope: ['read_public', 'read_relationships'],
    state: true,
    callbackURL: `${config.HTTPS_HOST}/api/auth/pinterest/callback`
  }, function (accessToken, refreshToken, profile, done) {
    if (!profile || !profile.id) {
      return done(null, false);
    }

    request.get(`${config.API}/v1/users`)
      .withCredentials()
      .query({pinterest_id: profile.id})
      .end((err, res) => {
        if (err) return done(null, false);

        const user = res.body && Object.keys(res.body).length > 0 ? res.body : null;

        if (user) {
          return done(null, user);
        }

        createUserFromPinterest({profile, done});
      });
  }
));

const router = express.Router();
co_express_router(router);

router.get('/pinterest', passport.authenticate('pinterest'));

router.get('/pinterest/callback',
  passport.authenticate('pinterest',
    { failureRedirect: '/api/auth/pinterest/failure' }
  ),
  function (req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function * (req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/pinterest/failure', function * (req, res, next) {
  res.json({error: 'failure to log in with pinterest'});
});

module.exports = router;
