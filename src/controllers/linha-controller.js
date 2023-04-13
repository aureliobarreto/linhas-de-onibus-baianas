const mongoose = require('mongoose');
const linha = require('../models/linha');
const Linha = mongoose.model('linha');

exports.get = (req, res, next) => {    
    res.status(200).send({
        message: 'TA BELEZA!'
    })
};

exports.post = (req, res, next) => {
    //console.log(req.body);
    prod = new Linha(req.body);
    prod.save().then(x => {
        res.status(200).send({
            message: 'Linha cadastrada com sucesso'
        })
    }).catch(e => {
        res.status(400).send({
            message: 'Erro ao cadastrar',
            data: e
        })
    })

    
    
};