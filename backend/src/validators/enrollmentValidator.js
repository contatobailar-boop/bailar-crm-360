const { requireFields, validateEnum, validateDate, validatePositiveNumber } = require('./helpers');
const AppError = require('../utils/AppError');

const STATUSES = ['ativa','pendente','pausada','cancelada'];

function validateEnrollmentCreate(body) {
  requireFields(body, ['student_id', 'class_id']);
  validateEnum(body, 'status', STATUSES);
  validateDate(body, 'start_date');
  validatePositiveNumber(body, 'monthly_value');
  if (body.due_day !== undefined) {
    const d = Number(body.due_day);
    if (isNaN(d) || d < 1 || d > 31) {
      throw AppError.validation('due_day deve ser entre 1 e 31', { field: 'due_day' });
    }
  }
}

function validateEnrollmentUpdate(body) {
  validateEnum(body, 'status', STATUSES);
  validateDate(body, 'start_date');
  validatePositiveNumber(body, 'monthly_value');
}

module.exports = { validateEnrollmentCreate, validateEnrollmentUpdate, STATUSES };
