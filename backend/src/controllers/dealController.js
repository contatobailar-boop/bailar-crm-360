const createBaseController = require('./baseController');
const dealService = require('../services/dealService');
const { validateDealCreate, validateDealUpdate } = require('../validators/dealValidator');

module.exports = createBaseController(dealService, 'Negócio', {
  validateCreate: validateDealCreate,
  validateUpdate: validateDealUpdate,
});
