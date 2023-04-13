const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Linha = mongoose.model('linha')

 router.get('/', (req ,res, next) => {
    console.log('PARAMS: ', req.query)
    if(req.query.opt == '01'){
        res.status(200).send({
            message: "opt1 !!!!"
        });
    }else{
        Linha.find({}).then(data => {
            res.status(200).send(data)
        }).catch(e => {
            res.status(400).send(e)
        })
        
    }
});
router.post('/', (req ,res, next) => {
    prod = new Linha(req.body);
    prod.save().then(x => {
        res.status(200).send({
            message: 'Linha cadastrado com sucesso'
        })
    }).catch(e => {
        res.status(400).send({
            message: 'Erro ao cadastrar',
            data: e
        })
    })
});

module.exports = router;