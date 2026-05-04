const BaseService = require('./baseService');

class ClassService extends BaseService {
  constructor() {
    super('classes');
  }

  async findAll(filters = {}) {
    return super.findAll(filters, {
      selectFields: '*, teacher:teachers(id, name)',
    });
  }

  async findById(id) {
    return super.findById(id, '*, teacher:teachers(id, name)');
  }
}

module.exports = new ClassService();
