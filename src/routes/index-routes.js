const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Linha = mongoose.model('linha')

 router.get('/', (req ,res, next) => {    
    res.status(200).send({
        message: "linhas de onibus baianas",
        version: "1.0 beta"
    });    
});

module.exports = router;