const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Linha = mongoose.model('linha')
const path = require('path');

 router.get('/', (req ,res, next) => {    
    res.status(200).sendFile('index.html', { root: path.join(__dirname, '../') })
});

module.exports = router;