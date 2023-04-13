const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
    codigo: {
        type: String,
        required: true,
        trim: true
    },
    nome: {
        type: String,
        required: true,
        unique: true,
    },
    paradas: [{
        type: String,
        required: false
    }],
    horariosDestino: [{
        type: String,
        required: false,
    }],
    horariosOrigem: [{
        type: String,
        required: false,
    }]

});

module.exports = mongoose.model('linha', schema);