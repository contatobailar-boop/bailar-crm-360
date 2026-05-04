// =============================================
// utils/response.js — Resposta padronizada
// =============================================
//
// Sucesso:
//   { success: true,  data: {}, message: "..." }
//
// Erro:
//   { success: false, data: null, message: "...",
//     code: "ERROR_TYPE", details: {} }
//
// =============================================

function ok(res, data, message = 'Operação realizada com sucesso', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
}

function created(res, data, message = 'Criado com sucesso') {
  return ok(res, data, message, 201);
}

function fail(res, message, statusCode = 400, code = 'VALIDATION_ERROR', details = null) {
  const body = {
    success: false,
    data: null,
    message,
    code,
  };
  if (details) body.details = details;
  return res.status(statusCode).json(body);
}

module.exports = { ok, created, fail };
