const BaseService = require('./baseService');

class AttendanceService extends BaseService {
  constructor() {
    super('attendance');
  }

  async findAll(filters = {}) {
    return super.findAll(filters, {
      selectFields: '*, student:students(id, name), class:classes(id, name, modality), teacher:teachers(id, name)',
      orderBy: 'date',
      ascending: false,
    });
  }
}

module.exports = new AttendanceService();
