const { requireFields, validateEnum, validateDate } = require('./helpers');

const PRIORITIES = ['baixa','media','alta','urgente'];
const STATUSES = ['pendente','em_andamento','concluida','atrasada'];

function validateTaskCreate(body) {
  requireFields(body, ['title']);
  validateEnum(body, 'priority', PRIORITIES);
  validateEnum(body, 'status', STATUSES);
  validateDate(body, 'due_date');
}

function validateTaskUpdate(body) {
  validateEnum(body, 'priority', PRIORITIES);
  validateEnum(body, 'status', STATUSES);
  validateDate(body, 'due_date');
}

module.exports = { validateTaskCreate, validateTaskUpdate, PRIORITIES, STATUSES };
