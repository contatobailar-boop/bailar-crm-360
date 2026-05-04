const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const ctrl = require('../controllers/attendanceController');
const router = express.Router();

router.use(authenticate);

router.get('/',    ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/',   authorize('admin', 'gestor', 'professor'), ctrl.create);
router.put('/:id', authorize('admin', 'gestor', 'professor'), ctrl.update);
router.delete('/:id', authorize('admin'),                     ctrl.remove);

module.exports = router;
