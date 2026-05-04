const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const ctrl = require('../controllers/paymentController');
const router = express.Router();

router.use(authenticate);

router.get('/',    authorize('admin', 'gestor', 'financeiro'), ctrl.list);
router.get('/:id', authorize('admin', 'gestor', 'financeiro'), ctrl.getById);
router.post('/',   authorize('admin', 'financeiro'),           ctrl.create);
router.put('/:id', authorize('admin', 'financeiro'),           ctrl.update);
router.delete('/:id', authorize('admin'),                      ctrl.remove);

module.exports = router;
