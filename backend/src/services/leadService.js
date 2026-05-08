const BaseService = require('./baseService');

class LeadService extends BaseService {
  constructor() {
    super('leads');
  }

  async findAll(filters = {}) {
    return super.findAll(filters);
  }

  async findById(id) {
    return super.findById(id);
  }
}

module.exports = new LeadService();
