const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Profile
const User = require('../../models/User');

// @route   GET api/profiles/test
// @desc    Tests profiles route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Profile works"}));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   Post api/profile/
// @desc    Create users profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    const {
      handle,
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      linkedin,
      facebook,
      instagram,
    } = req.body;

    if (handle) profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    // Sills - split into array;
    if (typeof skills !== undefined) {
      profileFields.skills = skills.split(',');
    }
    // Social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook= facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram= instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
          .then(profile => res.json(profile));
        } else {
          // Create

          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = 'That handle already exists';
                res.status(400).json(erros);
              }

              // Save Profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            });
        }
      });
  }
);

module.exports = router;