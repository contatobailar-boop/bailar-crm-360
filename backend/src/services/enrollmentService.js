const BaseService = require('./baseService');

class EnrollmentService extends BaseService {
  constructor() {
    super('enrollments');
  }

  async findAll(filters = {}) {
    return super.findAll(filters, {
      selectFields: '*, student:students(id, name), class:classes(id, name, modality)',
    });
  }
}

module.exports = new EnrollmentService();
