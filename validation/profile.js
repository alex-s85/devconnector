const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateProfileInput = (data) => {
  const errors = {};

  let {
    handle,
    status,
    skills,
    website,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = data;
  handle = !isEmpty(handle) ? handle : '';
  status = !isEmpty(status) ? status : '';
  skills = !isEmpty(skills) ? skills : '';

  if (!Validator.default.isLength(handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 40 characters';
  }

  if (Validator.default.isEmpty(handle)) {
    errors.handle = 'Profile handle is requird';
  }

  if (Validator.default.isEmpty(status)) {
    errors.status = 'Status field is requird';
  }

  if (Validator.default.isEmpty(skills)) {
    errors.skills = 'Skills handle is requird';
  }

  if (!isEmpty(website)) {
    if (!Validator.default.isURL(website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if (!isEmpty(youtube)) {
    if (!Validator.default.isURL(youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmpty(twitter)) {
    if (!Validator.default.isURL(twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(facebook)) {
    if (!Validator.default.isURL(facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmpty(linkedin)) {
    if (!Validator.default.isURL(linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!isEmpty(instagram)) {
    if (!Validator.default.isURL(instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
