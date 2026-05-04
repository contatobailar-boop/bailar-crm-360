// =============================================
// validators/helpers.js — Funções de validação
// Todos lançam AppError.validation() com code
// =============================================
const AppError = require('../utils/AppError');

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isPhone(v) {
  const digits = v.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
}

function isDate(v) {
  return !isNaN(Date.parse(v));
}

function requireFields(body, fields) {
  const missing = fields.filter(f => {
    const v = body[f];
    return v === undefined || v === null || (typeof v === 'string' && v.trim() === '');
  });
  if (missing.length > 0) {
    throw AppError.validation(`Campos obrigatórios faltando: ${missing.join(', ')}`, { missing });
  }
}

function validateEmail(body, field = 'email') {
  if (body[field] && !isEmail(body[field])) {
    throw AppError.validation(`E-mail inválido: ${body[field]}`, { field });
  }
}

function validatePhone(body, field = 'phone') {
  if (body[field] && !isPhone(body[field])) {
    throw AppError.validation(`Telefone inválido: ${body[field]}. Use 10 ou 11 dígitos.`, { field });
  }
}

function validateDate(body, field) {
  if (body[field] && !isDate(body[field])) {
    throw AppError.validation(`Data inválida no campo ${field}: ${body[field]}`, { field });
  }
}

function validateEnum(body, field, options) {
  if (body[field] !== undefined && body[field] !== null) {
    if (!options.includes(body[field])) {
      throw AppError.validation(
        `Valor inválido para ${field}: "${body[field]}". Opções: ${options.join(', ')}`,
        { field, value: body[field], allowed: options }
      );
    }
  }
}

function validatePositiveNumber(body, field) {
  if (body[field] !== undefined && body[field] !== null) {
    const n = Number(body[field]);
    if (isNaN(n) || n < 0) {
      throw AppError.validation(`${field} deve ser um número positivo`, { field });
    }
  }
}

module.exports = {
  isEmail, isPhone, isDate,
  requireFields, validateEmail, validatePhone,
  validateDate, validateEnum, validatePositiveNumber,
};
