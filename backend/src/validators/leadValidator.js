const { requireFields, validateEmail, validatePhone, validateDate, validateEnum } = require('./helpers');

const STATUSES = ['novo','em_atendimento','horarios_enviados','valores_enviados','aula_agendada','compareceu','matriculado','perdido'];
const TEMPS = ['frio','morno','quente'];

function validateLeadCreate(body) {
  requireFields(body, ['name', 'phone']);
  validateEmail(body);
  validatePhone(body);
  validateEnum(body, 'status', STATUSES);
  validateEnum(body, 'temperature', TEMPS);
  validateDate(body, 'first_contact_date');
  validateDate(body, 'next_action_date');
}

function validateLeadUpdate(body) {
  validateEmail(body);
  validatePhone(body);
  validateEnum(body, 'status', STATUSES);
  validateEnum(body, 'temperature', TEMPS);
  validateDate(body, 'first_contact_date');
  validateDate(body, 'next_action_date');
}

module.exports = { validateLeadCreate, validateLeadUpdate, STATUSES, TEMPS };
