const express = require('express');
const router = express.Router();
const controller = require('../controllers/linha-controller');

router.post('/', controller.post);
router.get('/', controller.get);
router.post('/buscarLinhaPorNome', controller.buscarLinhaPorNome);
router.post('/buscarLinhaPorParada', controller.buscarLinhaPorParada);
router.post('/buscarLinhaPorTrecho', controller.buscarLinhaPorTrecho);

module.exports = router;