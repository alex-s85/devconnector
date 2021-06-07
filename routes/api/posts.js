const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Posts works"}));

// @route   GET api/posts/create
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

module.exports = router;