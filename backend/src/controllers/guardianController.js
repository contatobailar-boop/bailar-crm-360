const createBaseController = require('./baseController');
const guardianService = require('../services/guardianService');
const { validateGuardianCreate, validateGuardianUpdate } = require('../validators/guardianValidator');

module.exports = createBaseController(guardianService, 'Responsável', {
  validateCreate: validateGuardianCreate,
  validateUpdate: validateGuardianUpdate,
});
