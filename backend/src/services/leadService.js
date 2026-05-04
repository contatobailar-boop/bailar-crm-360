const BaseService = require('./baseService');

class LeadService extends BaseService {
  constructor() {
    super('leads');
  }

  // Override findAll para incluir o atendente relacionado
  async findAll(filters = {}) {
    return super.findAll(filters, {
      selectFields: '*, assigned_user:users!leads_assigned_user_id_fkey(id, name)',
    });
  }

  // Override findById para incluir dados relacionados
  async findById(id) {
    return super.findById(id, '*, assigned_user:users!leads_assigned_user_id_fkey(id, name)');
  }
}

module.exports = new LeadService();
