const BaseService = require('./baseService');

class StudentService extends BaseService {
  constructor() {
    super('students');
  }
}

module.exports = new StudentService();
