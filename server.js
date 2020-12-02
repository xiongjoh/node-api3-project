const express = require('express');

const server = express();

server.use(logger)

//custom middleware

function logger(req, res, next) {
  console.log(req.method, req.url, new Date(Date.now()))
  next()
}

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
