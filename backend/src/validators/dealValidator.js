const { requireFields, validateEnum, validateDate, validatePositiveNumber } = require('./helpers');
const AppError = require('../utils/AppError');

const STAGES = ['novo_lead','qualificado','oferta_enviada','aula_agendada','aula_realizada','matricula_enviada','ganho','perdido'];

function validateDealCreate(body) {
  requireFields(body, ['title']);
  validateEnum(body, 'pipeline_stage', STAGES);
  validatePositiveNumber(body, 'amount');
  validateDate(body, 'expected_close_date');
}

function validateDealUpdate(body) {
  validateEnum(body, 'pipeline_stage', STAGES);
  validatePositiveNumber(body, 'amount');
  validateDate(body, 'expected_close_date');

  if (body.pipeline_stage === 'perdido' && !body.lost_reason) {
    throw AppError.business('Motivo da perda é obrigatório ao mover para "perdido"', { field: 'lost_reason' });
  }
}

module.exports = { validateDealCreate, validateDealUpdate, STAGES };
