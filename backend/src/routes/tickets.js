const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const ctrl = require('../controllers/ticketController');
const router = express.Router();

router.use(authenticate);

router.get('/',    ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/',   ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', authorize('admin', 'gestor'), ctrl.remove);

module.exports = router;
