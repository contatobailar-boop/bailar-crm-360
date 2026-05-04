const { requireFields, validateEnum, validateDate, validatePositiveNumber } = require('./helpers');
const AppError = require('../utils/AppError');

const STATUSES = ['pago','em_aberto','vencido','negociado'];
const METHODS = ['pix','dinheiro','cartao_credito','cartao_debito','boleto','transferencia'];

function validatePaymentCreate(body) {
  requireFields(body, ['student_id', 'amount', 'due_date']);
  validateEnum(body, 'status', STATUSES);
  validateDate(body, 'due_date');
  validateDate(body, 'paid_date');
  validatePositiveNumber(body, 'amount');
  validatePositiveNumber(body, 'discount');
}

function validatePaymentUpdate(body) {
  validateEnum(body, 'status', STATUSES);
  validateDate(body, 'due_date');
  validateDate(body, 'paid_date');
  validatePositiveNumber(body, 'amount');
  validatePositiveNumber(body, 'discount');

  // Regra: marcar como pago exige data e método
  if (body.status === 'pago') {
    if (!body.paid_date) {
      throw AppError.business('Data de pagamento (paid_date) é obrigatória ao marcar como pago', { field: 'paid_date' });
    }
    if (!body.payment_method) {
      throw AppError.business('Forma de pagamento (payment_method) é obrigatória ao marcar como pago', { field: 'payment_method' });
    }
    validateEnum(body, 'payment_method', METHODS);
  }
}

module.exports = { validatePaymentCreate, validatePaymentUpdate, STATUSES, METHODS };
