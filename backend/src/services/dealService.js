const BaseService = require('./baseService');

class DealService extends BaseService {
  constructor() {
    super('deals');
  }

  async findAll(filters = {}) {
    return super.findAll(filters, {
      selectFields: '*, lead:leads(id, name), assigned_user:users!deals_assigned_user_id_fkey(id, name)',
    });
  }

  async findById(id) {
    return super.findById(id, '*, lead:leads(id, name, phone), assigned_user:users!deals_assigned_user_id_fkey(id, name)');
  }
}

module.exports = new DealService();
