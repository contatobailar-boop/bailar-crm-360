// =============================================
// services/logService.js — Logs de auditoria
// =============================================
// Registra criação, atualização e exclusão
// na tabela "logs" com: quem, o quê, quando.
// =============================================
const supabase = require('../config/supabase');

async function log({ userId, action, entityType, entityId, oldValue = null, newValue = null }) {
  try {
    await supabase.from('logs').insert({
      user_id: userId || null,
      action,                      // create | update | delete
      entity_type: entityType,     // lead | student | payment ...
      entity_id: entityId || null,
      old_value: oldValue ? JSON.stringify(oldValue) : null,
      new_value: newValue ? JSON.stringify(newValue) : null,
    });
  } catch (err) {
    // Log falhou — não travar a request, só logar no console
    console.error('[LogService] Falha ao gravar log:', err.message);
  }
}

module.exports = { log };
