const express = require('express');
const userDb = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
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

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
