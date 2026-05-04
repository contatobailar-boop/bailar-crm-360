const { requireFields, validateEnum } = require('./helpers');

const CATEGORIES = ['atendimento','financeiro','professor','aula','cancelamento','reclamacao','duvida'];
const STATUSES = ['aberto','em_atendimento','aguardando_cliente','resolvido'];
const PRIORITIES = ['baixa','media','alta','urgente'];

function validateTicketCreate(body) {
  requireFields(body, ['title', 'category']);
  validateEnum(body, 'category', CATEGORIES);
  validateEnum(body, 'status', STATUSES);
  validateEnum(body, 'priority', PRIORITIES);
}

function validateTicketUpdate(body) {
  validateEnum(body, 'category', CATEGORIES);
  validateEnum(body, 'status', STATUSES);
  validateEnum(body, 'priority', PRIORITIES);
}

module.exports = { validateTicketCreate, validateTicketUpdate, CATEGORIES, STATUSES, PRIORITIES };
