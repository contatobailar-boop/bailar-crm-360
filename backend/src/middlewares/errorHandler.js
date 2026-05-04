// =============================================
// middlewares/errorHandler.js — Global handler
// =============================================
// Intercepta todos os erros e retorna o formato:
// { success, data, message, code, details? }
// =============================================

const errorHandler = (err, _req, res, _next) => {
  // 1. Erro de negócio (nosso AppError)
  if (err.name === 'AppError') {
    const body = {
      success: false,
      data: null,
      message: err.message,
      code: err.code || 'VALIDATION_ERROR',
    };
    if (err.details) body.details = err.details;
    return res.status(err.statusCode).json(body);
  }

  // 2. Erro do Supabase (tem .code, .message, .details nativos)
  if (err.code && err.message && typeof err.details === 'string') {
    console.error('[Supabase Error]', err.code, err.message);
    return res.status(400).json({
      success: false,
      data: null,
      message: err.message,
      code: 'VALIDATION_ERROR',
      details: { supabase_code: err.code },
    });
  }

  // 3. Erro genérico / não tratado
  console.error('[Unhandled Error]', err);
  return res.status(500).json({
    success: false,
    data: null,
    message: 'Erro interno do servidor',
    code: 'INTERNAL_ERROR',
  });
};

module.exports = errorHandler;
