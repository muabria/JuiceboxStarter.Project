const express = require('express');
const postsRouter = express.Router();
const prisma = require('../client');

// GET users active post.
postsRouter.get('/', async (req, res, next) => {

    try {
      const posts = await prisma.posts.findMany({
        include: {tags: true}
      });
      
      res.send({
        posts
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// POST: create a new post
postsRouter.post('/', requireUser, async (req, res, next) => {
    const { title, content = "" } = req.body;
  
    const postData = {};
  
    try {
      postData.authorId = req.user.id;
      postData.title = title;
      postData.content = content;
  
      const post = await prisma.posts.create(postData);
  
      if (post) {
        res.send(post);
      } else {
        next({
          name: 'PostCreationError',
          message: 'There was an error creating your post. Please try again.'
        })
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
  