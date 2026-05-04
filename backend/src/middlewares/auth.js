const jwt = require('jsonwebtoken');
const { fail } = require('../utils/response');

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return fail(res, 'Token não fornecido', 401, 'UNAUTHORIZED');
  try {
    req.user = jwt.verify(header.replace('Bearer ', ''), process.env.JWT_SECRET);
    next();
  } catch {
    return fail(res, 'Token inválido ou expirado', 401, 'UNAUTHORIZED');
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) return fail(res, 'Não autenticado', 401, 'UNAUTHORIZED');
    if (roles.length && !roles.includes(req.user.role)) {
      return fail(res, `Sem permissão. Roles necessárias: ${roles.join(', ')}`, 403, 'FORBIDDEN');
    }
    next();
  };
}

module.exports = { authenticate, authorize };
