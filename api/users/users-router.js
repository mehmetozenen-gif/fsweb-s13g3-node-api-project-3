
const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

const router = express.Router();

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// POST /api/users
router.post('/', validateUser, async (req, res, next) => {
  try {
    const user = await Users.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// ID içeren tüm kullanıcı endpointleri
router.use('/:id', validateUserId);

// GET /api/users/:id
router.get('/:id', (req, res) => {
  res.status(200).json(req.user);
});

// PUT /api/users/:id
router.put('/:id', validateUser, async (req, res, next) => {
  try {
    const user = await Users.update(
      req.params.id,
      req.body
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Users.remove(req.params.id);
    res.status(200).json({ deleted });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id/posts
router.get('/:id/posts', async (req, res, next) => {
  try {
    const posts = await Users.getUserPosts(
      req.params.id
    );

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/:id/posts
router.post(
  '/:id/posts',
  validatePost,
  async (req, res, next) => {
    try {
      const post = {
        text: req.body.text,
        user_id: req.user.id,
      };

      const newPost = await Posts.insert(post);

      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
