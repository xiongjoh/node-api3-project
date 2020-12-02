const userDb = require('../users/userDb')

//custom middleware

async function validateUserId(req, res, next) {
    const { id } = req.params
    const user = await userDb.getById(id)
  
    try {
      if (!user) {
        res.status(404).json({message:`user id:${id} not found`})
      } else {
        req.userInfo = user
        next()
      }
    }
    catch(error) {
      res.status(500).json({message:error.message})
    }
  }
  
  async function validateUser(req, res, next) {
    console.log(req.body)
    if(!req.body) {
      res.status(400).json({message:"missing user data"})
    } else if (!req.body.name) {
      res.status(400).json({message:"missing required name field"})
    } else {
      next()
    }
  }
  
  function validatePost(req, res, next) {
    if(!req.body) {
      res.status(400).json({message:"missing post data"})
    } else if (!req.body.text) {
      res.status(400).json({message:"missing required text field"})
    } else {
      next()
    }
  }

  module.exports = {
      validateUserId,
      validateUser,
      validatePost,
  }