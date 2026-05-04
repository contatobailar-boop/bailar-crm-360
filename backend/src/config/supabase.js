// =============================================
// config/supabase.js — Conexão com o Supabase
// =============================================
const { createClient } = require('@supabase/supabase-js');

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('ERRO: SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar no .env');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

module.exports = supabase;
