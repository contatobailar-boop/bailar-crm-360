const BaseService = require('./baseService');

class PaymentService extends BaseService {
  constructor() {
    super('payments');
  }

  async findAll(filters = {}) {
    return super.findAll(filters, {
      selectFields: '*, student:students(id, name), enrollment:enrollments(id, class:classes(id, name, modality))',
      orderBy: 'due_date',
      ascending: false,
    });
  }
}

module.exports = new PaymentService();
