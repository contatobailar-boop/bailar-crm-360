const BaseService = require('./baseService');

class EventService extends BaseService {
  constructor() {
    super('events');
  }

  async findAll(filters = {}) {
    return super.findAll(filters, {
      orderBy: 'date',
      ascending: false,
    });
  }
}

module.exports = new EventService();
