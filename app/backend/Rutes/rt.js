//Modulo de Apis
const express = require('express');
const router = express.Router();
const token = require('jsonwebtoken')
const pool = require('../BD/config.js');


router.get('/', (req, res) => {
  res.render('main',{navbar:'navbar'});
});

router.get('/inicio/form', (req, res) => {
  res.render('form',{navbar:'navbar'});
});

router.get('/usuarios/:id', (req, res) => {
  const usuarioId = req.params.id;
  res.send(`Solicitud para el usuario con ID ${usuarioId}`);
});



module.exports = router;
