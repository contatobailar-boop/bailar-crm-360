const { requireFields, validateEmail, validatePhone } = require('./helpers');

function validateGuardianCreate(body) {
  requireFields(body, ['name', 'student_id']);
  validateEmail(body);
  validatePhone(body);
}

function validateGuardianUpdate(body) {
  validateEmail(body);
  validatePhone(body);
}

module.exports = { validateGuardianCreate, validateGuardianUpdate };
