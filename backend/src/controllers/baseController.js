// =============================================
// controllers/baseController.js — CRUD com
// validação, logs e resposta padronizada
// =============================================
const { ok, created, fail } = require('../utils/response');
const AppError = require('../utils/AppError');
const { log } = require('../services/logService');

function createBaseController(service, entityName, options = {}) {
  const { validateCreate, validateUpdate } = options;
  const entityType = entityName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return {
    async list(req, res, next) {
      try {
        const data = await service.findAll(req.query);
        return ok(res, data, `${entityName}(s) listado(s)`);
      } catch (err) { next(err); }
    },

    async getById(req, res, next) {
      try {
        const data = await service.findById(req.params.id);
        if (!data) throw AppError.notFound(entityName);
        return ok(res, data);
      } catch (err) { next(err); }
    },

    async create(req, res, next) {
      try {
        if (validateCreate) validateCreate(req.body);
        const data = await service.create(req.body);
        await log({ userId: req.user?.id, action: 'create', entityType, entityId: data.id, newValue: data });
        return created(res, data, `${entityName} criado(a) com sucesso`);
      } catch (err) { next(err); }
    },

    async update(req, res, next) {
      try {
        if (validateUpdate) validateUpdate(req.body);
        const old = await service.findById(req.params.id);
        if (!old) throw AppError.notFound(entityName);
        const data = await service.update(req.params.id, req.body);
        await log({ userId: req.user?.id, action: 'update', entityType, entityId: data.id, oldValue: old, newValue: data });
        return ok(res, data, `${entityName} atualizado(a) com sucesso`);
      } catch (err) { next(err); }
    },

    async remove(req, res, next) {
      try {
        const old = await service.findById(req.params.id);
        if (!old) throw AppError.notFound(entityName);
        await service.delete(req.params.id);
        await log({ userId: req.user?.id, action: 'delete', entityType, entityId: req.params.id, oldValue: old });
        return ok(res, null, `${entityName} excluído(a) com sucesso`);
      } catch (err) { next(err); }
    },
  };
}

module.exports = createBaseController;
