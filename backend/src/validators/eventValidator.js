const { requireFields, validateDate, validatePositiveNumber } = require('./helpers');

function validateEventCreate(body) {
  requireFields(body, ['title', 'date']);
  validateDate(body, 'date');
  validatePositiveNumber(body, 'price');
}

function validateEventUpdate(body) {
  validateDate(body, 'date');
  validatePositiveNumber(body, 'price');
}

module.exports = { validateEventCreate, validateEventUpdate };
