const BaseService = require('./baseService');

class TaskService extends BaseService {
  constructor() {
    super('tasks');
  }

  async findAll(filters = {}) {
    return super.findAll(filters, {
      selectFields: '*, assigned_user:users!tasks_assigned_user_id_fkey(id, name)',
      orderBy: 'due_date',
      ascending: true,
    });
  }
}

module.exports = new TaskService();
