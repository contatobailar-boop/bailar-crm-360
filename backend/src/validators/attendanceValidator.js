const { requireFields, validateEnum, validateDate } = require('./helpers');

const STATUSES = ['presente','falta','falta_justificada','reposicao_pendente','reposicao_feita'];

function validateAttendanceCreate(body) {
  requireFields(body, ['student_id', 'class_id', 'date']);
  validateEnum(body, 'status', STATUSES);
  validateDate(body, 'date');
}

function validateAttendanceUpdate(body) {
  validateEnum(body, 'status', STATUSES);
  validateDate(body, 'date');
}

module.exports = { validateAttendanceCreate, validateAttendanceUpdate, STATUSES };
