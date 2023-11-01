const express = require('express');
const postsRouter = express.Router();
const prisma = require('../client');
const { requireUser } = require('./utils');



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
      postData.tags = tags;
  
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
  
// PUT: update current post
  postsRouter.put('/:postId', requireUser, async (req, res, next) => {
    const { postId } = req.params;
    const { title, content, tags } = req.body;

    try {
        const originalPost = await prisma.posts.findUnique({
            where:{
                id: Number(postId)
            }
        })
   
      if (originalPost.authorId === req.user.id) {

        const updatedPost =  await prisma.posts.update({
                where:{
                   id: Number(postId),
                   authorId: Number(req.user.id)
                },
                data:{
                    title: title,
                    content: content,
                    tags:{
                        updateMany:{
                            where:{
                                id: tags.id
                            },
                            data:{name: tags.name}
                        }
                    }
                },
                include: {tags: true}
              });
        res.send({ post: updatedPost })
      } else {
        next({
          name: 'UnauthorizedUserError',
          message: 'You cannot update a post that is not yours'
        })
      }

    } catch ({ name, message }) {
      next({ name, message })
    }
  });

module.exports = postsRouter;