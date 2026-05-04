// =============================================
// utils/AppError.js — Erro tipado com code
// =============================================
// Códigos possíveis:
//   VALIDATION_ERROR  — campo inválido/faltando
//   BUSINESS_RULE     — regra de negócio violada
//   NOT_FOUND         — registro não encontrado
//   UNAUTHORIZED      — token ausente/inválido
//   FORBIDDEN         — sem permissão (role)
//   INTERNAL_ERROR    — erro inesperado
// =============================================

class AppError extends Error {
  constructor(message, statusCode = 400, code = 'VALIDATION_ERROR', details = null) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }

  // Atalhos estáticos para criar erros comuns
  static validation(message, details = null) {
    return new AppError(message, 400, 'VALIDATION_ERROR', details);
  }

  static business(message, details = null) {
    return new AppError(message, 409, 'BUSINESS_RULE', details);
  }

  static notFound(entity = 'Registro') {
    return new AppError(`${entity} não encontrado(a)`, 404, 'NOT_FOUND');
  }

  static unauthorized(message = 'Não autenticado') {
    return new AppError(message, 401, 'UNAUTHORIZED');
  }

  static forbidden(message = 'Sem permissão') {
    return new AppError(message, 403, 'FORBIDDEN');
  }
}

module.exports = AppError;
