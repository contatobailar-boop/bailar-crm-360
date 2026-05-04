const createBaseController = require('./baseController');
const ticketService = require('../services/ticketService');
const { validateTicketCreate, validateTicketUpdate } = require('../validators/ticketValidator');

module.exports = createBaseController(ticketService, 'Ticket', {
  validateCreate: validateTicketCreate,
  validateUpdate: validateTicketUpdate,
});
