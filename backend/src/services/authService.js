const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

class AuthService {
  async login(email, password) {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('active', true)
      .limit(1);

    if (error) throw error;
    if (!users || users.length === 0) throw new Error('Credenciais inválidas');

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new Error('Credenciais inválidas');

    const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    return { token, user: payload };
  }

  async getProfile(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role, active')
      .eq('id', userId)
      .single();
    if (error || !data || !data.active) throw new Error('Usuário inválido');
    return data;
  }
}

module.exports = new AuthService();
