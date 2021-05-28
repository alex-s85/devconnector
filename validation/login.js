const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateLoginInput = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.default.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.default.isEmpty(data.email)) {
    errors.email = 'Email field is requird';
  }

  if (Validator.default.isEmpty(data.password)) {
    errors.password = 'Password field is requird';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
