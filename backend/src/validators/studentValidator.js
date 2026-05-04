const { requireFields, validateEmail, validatePhone, validateDate, validateEnum } = require('./helpers');

const STATUSES = ['ativo','em_teste','inadimplente','pausado','cancelado'];

function validateStudentCreate(body) {
  requireFields(body, ['name']);
  validateEmail(body);
  validatePhone(body);
  validateEnum(body, 'status', STATUSES);
  validateDate(body, 'birth_date');
}

function validateStudentUpdate(body) {
  validateEmail(body);
  validatePhone(body);
  validateEnum(body, 'status', STATUSES);
  validateDate(body, 'birth_date');
}

module.exports = { validateStudentCreate, validateStudentUpdate, STATUSES };
