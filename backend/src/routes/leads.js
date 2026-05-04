const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const ctrl = require('../controllers/leadController');
const router = express.Router();

router.use(authenticate);

router.get('/',    ctrl.list);       // GET    /api/leads
router.get('/:id', ctrl.getById);    // GET    /api/leads/:id
router.post('/',   authorize('admin', 'gestor', 'atendimento'), ctrl.create);  // POST   /api/leads
router.put('/:id', authorize('admin', 'gestor', 'atendimento'), ctrl.update);  // PUT    /api/leads/:id
router.delete('/:id', authorize('admin'),                       ctrl.remove);  // DELETE /api/leads/:id

module.exports = router;
