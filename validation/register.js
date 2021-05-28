const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateRegisterInput = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.default.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.default.isEmpty(data.name)) {
    errors.name = 'Name field is requird';
  }

  if (Validator.default.isEmpty(data.email)) {
    errors.email = 'Email field is requird';
  }

  if (!Validator.default.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.default.isEmpty(data.password)) {
    errors.password = 'Password field is requird';
  }

  if (!Validator.default.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password msut be strong';
  }

  if (Validator.default.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is requird';
  }

  if (!Validator.default.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
