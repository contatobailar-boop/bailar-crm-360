const createBaseController = require('./baseController');
const leadService = require('../services/leadService');
const { validateLeadCreate, validateLeadUpdate } = require('../validators/leadValidator');

module.exports = createBaseController(leadService, 'Lead', {
  validateCreate: validateLeadCreate,
  validateUpdate: validateLeadUpdate,
});
