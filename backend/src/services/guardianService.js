const BaseService = require('./baseService');

class GuardianService extends BaseService {
  constructor() {
    super('guardians');
  }

  async findAll(filters = {}) {
    return super.findAll(filters, {
      selectFields: '*, student:students(id, name)',
    });
  }
}

module.exports = new GuardianService();
