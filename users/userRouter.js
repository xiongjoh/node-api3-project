const express = require('express');
const userDb = require('./userDb')
const postDb = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = await userDb.insert(req.body)
    res.status(201).json(newUser)
  }
  catch(error) {
    res.status(500).json({message:error.message})
  }

});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  const { id } = req.params
  try {
    const newPost = await postDb.insert({...req.body, user_id:id})
    res.status(201).json(newPost)
  }
  catch(error) {
    res.status(500).json({message:error.message})
  }
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
  const { id } = req.params
  userDb.getUserPosts(id)
  .then(results => {
    res.status(200).json(results)
  })
  .catch(error => {
    res.status(500).json({message:error.message})
  })
});

router.delete('/:id', validateUserId, async (req, res) => {
  const { id } = req.params
  try {
    await userDb.remove(id)
    res.json(req.userInfo)
  }
  catch(error) {
    res.status(500).json({message:error.message})
  }
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const { id } = req.params
  userDb.update(id, req.body)
  .then(results => {
    if (results) {
      res.status(201).json({id:Number(id), name:req.body.name})
    } else {
      res.status(400).json({message:"Failed to update database"})
    }
  })
  .catch(error => {
    res.status(500).json({message:message.error})
  })
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
  if(!req.body) {
    res.status(400).json({message:"missing post data"})
  } else if (!req.body.text) {
    res.status(400).json({message:"missing required text field"})
  } else {
    next()
  }
}

module.exports = router;
