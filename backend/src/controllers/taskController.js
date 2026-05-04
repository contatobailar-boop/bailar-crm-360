const createBaseController = require('./baseController');
const taskService = require('../services/taskService');
const { validateTaskCreate, validateTaskUpdate } = require('../validators/taskValidator');

module.exports = createBaseController(taskService, 'Tarefa', {
  validateCreate: validateTaskCreate,
  validateUpdate: validateTaskUpdate,
});
