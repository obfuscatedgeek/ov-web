const next = require('next');
const express = require('express');

const config = require('./conf/env-config');
const routes = require('./routes');
console.log(process.env.NODE_ENV !== 'production');
const dev = process.env.NODE_ENV !== 'production';

const app = next({dev});
const handler = routes.getRequestHandler(app);

app.prepare()
  .then(() => {

    const server = express();

    server.use(handler);

    server.listen(config.PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on port ${config.PORT}`);
    });
  });

