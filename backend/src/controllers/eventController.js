const createBaseController = require('./baseController');
const eventService = require('../services/eventService');
const { validateEventCreate, validateEventUpdate } = require('../validators/eventValidator');

module.exports = createBaseController(eventService, 'Evento', {
  validateCreate: validateEventCreate,
  validateUpdate: validateEventUpdate,
});
