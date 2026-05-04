const createBaseController = require('./baseController');
const classService = require('../services/classService');
const { validateClassCreate, validateClassUpdate } = require('../validators/classValidator');

module.exports = createBaseController(classService, 'Turma', {
  validateCreate: validateClassCreate,
  validateUpdate: validateClassUpdate,
});
