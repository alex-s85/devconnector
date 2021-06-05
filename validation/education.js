const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateEducationInput = (data) => {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (Validator.default.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }

  if (Validator.default.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (Validator.default.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'Field of study field is required';
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
  }
}
