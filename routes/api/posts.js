const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Posts works"}));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get(
  '/',
  (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: 'No posts found'}));
  }
);

// @route   GET api/post/:id
// @desc    Get post by id
// @access  Public
router.get(
  '/:id',
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err => res.status(404).json({ nopostfound: 'No post found with that ID'}));
  }
);

// @route   POST api/posts/create
// @desc    Create new post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any erros, send 400 with errors object
      return res.status(400).json(errors);
    }

    const {
      text,
      name,
      avatar,
    } = req.body;

    const newPost = new Post({
      text: text,
      name: name,
      avatar: avatar,
      user: req.user.id,
    });

    newPost.save()
      .then(post => res.json(post));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndUpdate({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            // Check for post owner
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({ notauthorized: 'User not authorized' })
            }

            // Delete
            post.remove()
              .then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
      })
  },
);

// @route   POST api/posts/like/:post_id
// @desc    Like post
// @access  Private
router.post(
  '/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndUpdate({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
              return res.status(400).json({ alreadyliked: 'User already liked this post' });
            }

            // Add user id to likes array
            post.likes.unshift({ user: req.user.id });

            post.save().then(post => res.json(post));
          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
      })
  },
);

// @route   POST api/posts/unlike/:post_id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndUpdate({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
              return res.status(400).json({ notliked: 'You have not yet liked this post' });
            }

            // Get remove index
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            if (removeIndex < 0) {
              return res.status(404).json({ noexperience: 'There is no experience item matching the ID.'});
            }

            // Splice out of array
            post.likes.splice(removeIndex, 1);

            // Save
            post.save()
              .then(post => res.json(post));
          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
      })
  },
);

module.exports = router;