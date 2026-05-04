const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const ctrl = require('../controllers/dealController');
const router = express.Router();

router.use(authenticate);

router.get('/',    ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/',   authorize('admin', 'gestor', 'atendimento'), ctrl.create);
router.put('/:id', authorize('admin', 'gestor', 'atendimento'), ctrl.update);
router.delete('/:id', authorize('admin'),                       ctrl.remove);

module.exports = router;
