const { ok, fail } = require('../utils/response');
const authService = require('../services/authService');

const authController = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return fail(res, 'E-mail e senha são obrigatórios');
      const result = await authService.login(email, password);
      return ok(res, result, 'Login realizado com sucesso');
    } catch (err) {
      return fail(res, err.message || 'Credenciais inválidas', 401);
    }
  },

  async me(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.id);
      return ok(res, user);
    } catch {
      return fail(res, 'Usuário inválido', 401);
    }
  },
};

module.exports = authController;
