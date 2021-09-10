const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateExperienceInput = (data) => {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (Validator.default.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }

  if (Validator.default.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.default.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  if (Validator.default.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
