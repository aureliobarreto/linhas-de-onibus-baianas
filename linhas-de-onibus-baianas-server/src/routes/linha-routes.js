const express = require('express');
const router = express.Router();
const controller = require('../controllers/linha-controller');

router.post('/', controller.post);
router.get('/', controller.get);
router.get('/buscarLinhaPorNome/:nome', controller.buscarLinhaPorNome);
router.get('/buscarLinhaPorParada/:parada', controller.buscarLinhaPorParada);
router.get('/buscarLinhaPorTrecho', controller.buscarLinhaPorTrecho);
router.get('/buscarLinhaPorTrechoEAgenda', controller.buscarLinhaPorTrechoEAgenda);


module.exports = router;