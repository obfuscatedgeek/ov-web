const next = require('next');
const express = require('express');
const body_parser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const fs = require('fs');
const https = require('https');

const config = require('./conf/env-config');
const routes = require('./routes');

const api = require('./api/routes/api');
const auth = require('./api/routes/auth');

const dev = process.env.NODE_ENV !== 'production';

const app = next({dev});
const handler = routes.getRequestHandler(app);

app.prepare()
  .then(() => {

    const server = express();

    server.set('trust proxy', 1);
    server.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }));

    server.use(passport.initialize());
    server.use(body_parser.json());

    server.use('/api/auth', auth);
    server.use('/api/api', api);

    server.use(handler);

    https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    }, server).listen(4100);

    server.listen(config.PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on port ${config.PORT}`);
    });
  });

