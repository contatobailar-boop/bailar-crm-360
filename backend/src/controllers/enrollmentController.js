const createBaseController = require('./baseController');
const enrollmentService = require('../services/enrollmentService');
const { validateEnrollmentCreate, validateEnrollmentUpdate } = require('../validators/enrollmentValidator');
const supabase = require('../config/supabase');
const AppError = require('../utils/AppError');
const { created } = require('../utils/response');
const { log } = require('../services/logService');

const base = createBaseController(enrollmentService, 'Matrícula', {
  validateCreate: validateEnrollmentCreate,
  validateUpdate: validateEnrollmentUpdate,
});

// Regra: verificar se aluno existe e turma tem vaga
const originalCreate = base.create;
base.create = async (req, res, next) => {
  try {
    validateEnrollmentCreate(req.body);

    // Verificar se aluno existe
    const { data: student } = await supabase
      .from('students')
      .select('id, name')
      .eq('id', req.body.student_id)
      .single();
    if (!student) throw AppError.notFound('Aluno não encontrado');

    // Verificar se turma existe e tem vaga
    const { data: cls } = await supabase
      .from('classes')
      .select('id, name, capacity, active')
      .eq('id', req.body.class_id)
      .single();
    if (!cls) throw AppError.notFound('Turma não encontrada');
    if (!cls.active) throw AppError.business('Esta turma está inativa');

    const { data: currentEnrollments } = await supabase
      .from('enrollments')
      .select('id')
      .eq('class_id', req.body.class_id)
      .eq('status', 'ativa');

    if (currentEnrollments && currentEnrollments.length >= cls.capacity) {
      throw AppError.business(`Turma "${cls.name}" lotada (${cls.capacity}/${cls.capacity} vagas)`);
    }

    // Verificar matrícula duplicada
    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', req.body.student_id)
      .eq('class_id', req.body.class_id)
      .eq('status', 'ativa');

    if (existing && existing.length > 0) {
      throw AppError.business('Este aluno já possui matrícula ativa nesta turma');
    }

    const data = await enrollmentService.create(req.body);
    await log({ userId: req.user?.id, action: 'create', entityType: 'matricula', entityId: data.id, newValue: data });
    return created(res, data, 'Matrícula criada com sucesso');
  } catch (err) { next(err); }
};

module.exports = base;
