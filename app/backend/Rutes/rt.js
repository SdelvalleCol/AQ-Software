//Modulo de Apis
const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const token = require('jsonwebtoken')
const pool = require('../BD/config.js');


//RUTAS VISTAS
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


//RUTAS APIS

router.get('/registrar/usuario',(req,res)=>{
  const { usuariodata } = req.query;
  const productoObj = querystring.parse(usuariodata);
  console.log(productoObj);
  res.send('Producto recibido');
})


module.exports = router;
