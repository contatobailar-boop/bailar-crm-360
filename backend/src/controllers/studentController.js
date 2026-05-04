const createBaseController = require('./baseController');
const studentService = require('../services/studentService');
const { validateStudentCreate, validateStudentUpdate } = require('../validators/studentValidator');
const supabase = require('../config/supabase');
const AppError = require('../utils/AppError');
const { ok } = require('../utils/response');
const { log } = require('../services/logService');

const base = createBaseController(studentService, 'Aluno', {
  validateCreate: validateStudentCreate,
  validateUpdate: validateStudentUpdate,
});

// Regra: impedir deletar aluno com matrícula ativa
base.remove = async (req, res, next) => {
  try {
    const { data: activeEnrollments } = await supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', req.params.id)
      .eq('status', 'ativa');

    if (activeEnrollments && activeEnrollments.length > 0) {
      throw AppError.business(
        `Não é possível excluir este aluno: possui ${activeEnrollments.length} matrícula(s) ativa(s). Cancele as matrículas primeiro.`
      );
    }

    const old = await studentService.findById(req.params.id);
    if (!old) throw AppError.notFound('Aluno não encontrado');

    await studentService.delete(req.params.id);
    await log({ userId: req.user?.id, action: 'delete', entityType: 'aluno', entityId: req.params.id, oldValue: old });
    return ok(res, null, 'Aluno excluído com sucesso');
  } catch (err) { next(err); }
};

module.exports = base;
