const createBaseController = require('./baseController');
const paymentService = require('../services/paymentService');
const { validatePaymentCreate, validatePaymentUpdate } = require('../validators/paymentValidator');

module.exports = createBaseController(paymentService, 'Pagamento', {
  validateCreate: validatePaymentCreate,
  validateUpdate: validatePaymentUpdate,
});
