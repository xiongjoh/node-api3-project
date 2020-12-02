const express = require('express');

const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')
const middleware = require('./middlewares/middlewares')
const server = express();

server.use(logger)
server.use(express.json())

//custom middleware

// logger middleware
function logger(req, res, next) {
  console.log(req.method, req.url, new Date(Date.now()))
  next()
}
// validation middleware
function validateUserId(req, res, next) {

}

server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
