// =============================================
// services/baseService.js — CRUD genérico
// =============================================
// Todos os services herdam deste.
// Evita repetir select/insert/update/delete.
// =============================================
const supabase = require('../config/supabase');

class BaseService {
  constructor(table) {
    this.table = table;
  }

  async findAll(filters = {}, options = {}) {
    const { orderBy = 'created_at', ascending = false, selectFields = '*' } = options;
    let query = supabase.from(this.table).select(selectFields).order(orderBy, { ascending });

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null && value !== '') {
        query = query.eq(key, value);
      }
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async findById(id, selectFields = '*') {
    const { data, error } = await supabase
      .from(this.table)
      .select(selectFields)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async create(payload) {
    const { data, error } = await supabase
      .from(this.table)
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async update(id, payload) {
    const { data, error } = await supabase
      .from(this.table)
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }
}

module.exports = BaseService;
