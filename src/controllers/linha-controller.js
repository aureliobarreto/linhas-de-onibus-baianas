const mongoose = require('mongoose');
const linha = require('../models/linha');
const Linha = mongoose.model('linha');

exports.get = ('/', (req ,res, next) => {    
    
    Linha.find({}).then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send(e)
    })        
    
});

exports.post = (req, res, next) => {
    //console.log(req.body);
    linha = new Linha(req.body);
    linha.save().then(x => {
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

exports.buscarLinhaPorNome = async (req, res, next) => {
    await Linha.find({ nome: new RegExp(req.params.nome, 'i')}).exec().then(data => {
        if(data != null){
            res.status(200).send(data)
        }else{
            res.status(404).send({
                message: "linha não encontrada"
            })
        }
        
    }).catch(e => {
        res.status(400).send(e)
    })        
    
}

exports.buscarLinhaPorParada = async (req, res, next) => {
    await Linha.find({paradas: new RegExp(req.params.nome, 'i')}).exec().then(data => {
        if(data != null){
            res.status(200).send(data)
        }else{
            res.status(404).send({
                message: "linha não encontrada"
            })
        }
        
    }).catch(e => {
        res.status(400).send(e)
    })    
}

exports.buscarLinhaPorTrecho = async (req, res, next) => {
    await Linha.find({paradas: {$all: [new RegExp(req.query.origem, 'i'), new RegExp(req.query.destino, 'i')]}}).exec().then(data => {
        if(data != null){
            res.status(200).send(data)
        }else{
            res.status(404).send({
                message: "linha não encontrada"
            })
        }
        
    }).catch(e => {
        res.status(400).send(e)
    })        
}

// TODO: buscarLinhaPorTrechoEAgenda
exports.buscarLinhaPorTrechoEAgenda = async (req, res, next) => {
    await Linha.find({paradas: new RegExp(req.body.nome, 'i')}).find({horariosOrigem: req.body.hora}).exec().then(data => {
        if(data != null){
            res.status(200).send(data)
        }else{
            res.status(404).send({
                message: "linha não encontrada"
            })
        }
        
    }).catch(e => {
        res.status(400).send(e)
    })        
}
