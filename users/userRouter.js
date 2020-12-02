const express = require('express');
const userDb = require('./userDb')

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  console.log(req.body)
  const newUser = await userDb.insert(req.body)
  res.status(201).json(newUser)
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  userDb.get()
  .then(results => {
    res.status(200).json(results)
  })
  .catch(err => {
    res.status(500).json({message:err.message})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.userInfo)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id',validateUserId, (req, res) => {
  // do your magic!
});


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
  // do your magic!
}

module.exports = router;
