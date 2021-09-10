const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validatePostInput = (data) => {
  const errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.default.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300';
  }

  if (Validator.default.isEmpty(data.text)) {
    errors.text = 'Text field is requird';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
