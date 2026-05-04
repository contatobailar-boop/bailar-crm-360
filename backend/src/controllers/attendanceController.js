const createBaseController = require('./baseController');
const attendanceService = require('../services/attendanceService');
const { validateAttendanceCreate, validateAttendanceUpdate } = require('../validators/attendanceValidator');
const supabase = require('../config/supabase');
const AppError = require('../utils/AppError');
const { created } = require('../utils/response');
const { log } = require('../services/logService');

const base = createBaseController(attendanceService, 'Presença', {
  validateCreate: validateAttendanceCreate,
  validateUpdate: validateAttendanceUpdate,
});

// Regra: só pode marcar reposição_feita se houver reposição_pendente
const originalUpdate = base.update;
base.update = async (req, res, next) => {
  try {
    if (req.body.status === 'reposicao_feita') {
      const old = await attendanceService.findById(req.params.id);
      if (!old) throw AppError.notFound('Presença não encontrada');
      if (old.status !== 'reposicao_pendente') {
        throw AppError.business('Só é possível marcar "reposição feita" em registros com status "reposição pendente"');
      }
    }
    return originalUpdate(req, res, next);
  } catch (err) { next(err); }
};

// Regra: verificar que aluno está matriculado na turma
const originalCreate = base.create;
base.create = async (req, res, next) => {
  try {
    validateAttendanceCreate(req.body);

    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', req.body.student_id)
      .eq('class_id', req.body.class_id)
      .eq('status', 'ativa')
      .limit(1);

    if (!enrollment || enrollment.length === 0) {
      throw AppError.business('Aluno não possui matrícula ativa nesta turma');
    }

    // Verificar duplicata (mesma turma, mesmo aluno, mesma data)
    const { data: existing } = await supabase
      .from('attendance')
      .select('id')
      .eq('student_id', req.body.student_id)
      .eq('class_id', req.body.class_id)
      .eq('date', req.body.date);

    if (existing && existing.length > 0) {
      throw AppError.business('Já existe registro de presença para este aluno nesta turma e data');
    }

    const data = await attendanceService.create(req.body);
    await log({ userId: req.user?.id, action: 'create', entityType: 'presenca', entityId: data.id, newValue: data });
    return created(res, data, 'Presença registrada com sucesso');
  } catch (err) { next(err); }
};

module.exports = base;
