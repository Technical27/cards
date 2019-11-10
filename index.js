const express = require('express');
const next = require('next');

const app = next({dev: process.env.NODE_ENV !== 'production'});
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    server.get('/test', (req, res) => res.send('test'));
    server.get('*', handle);
    server.listen(3000, () => console.log('server started'));
  })
  .catch(e => {
    console.error(e.stack);
    process.exit(1);
  });
