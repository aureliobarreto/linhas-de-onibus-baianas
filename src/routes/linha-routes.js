const express = require('express');
const router = express.Router();
const controller = require('../controllers/linha-controller');

router.post('/', controller.post);
router.get('/', controller.get);
router.get('/buscarLinhaPorNome', controller.buscarLinhaPorNome);
router.get('/buscarLinhaPorParada', controller.buscarLinhaPorParada);
router.get('/buscarLinhaPorTrecho', controller.buscarLinhaPorTrecho);

module.exports = router;