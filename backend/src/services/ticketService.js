const BaseService = require('./baseService');

class TicketService extends BaseService {
  constructor() {
    super('tickets');
  }

  async findAll(filters = {}) {
    return super.findAll(filters, {
      selectFields: '*, student:students(id, name), lead:leads(id, name), assigned_user:users!tickets_assigned_user_id_fkey(id, name)',
    });
  }
}

module.exports = new TicketService();
