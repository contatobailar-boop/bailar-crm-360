const { requireFields, validateEnum } = require('./helpers');

const LEVELS = ['iniciante','intermediario','avancado','infantil','adulto'];
const WEEKDAYS = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'];

function validateClassCreate(body) {
  requireFields(body, ['name', 'modality', 'weekday', 'start_time', 'end_time']);
  validateEnum(body, 'level', LEVELS);
  validateEnum(body, 'weekday', WEEKDAYS);
}

function validateClassUpdate(body) {
  validateEnum(body, 'level', LEVELS);
  if (body.weekday) validateEnum(body, 'weekday', WEEKDAYS);
}

module.exports = { validateClassCreate, validateClassUpdate, LEVELS, WEEKDAYS };
