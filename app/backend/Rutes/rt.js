//Modulo de Apis
const express = require('express');
const router = express.Router();
const pool = require('../BD/config.js');
const token = require('jsonwebtoken')


//RUTAS VISTAS
router.get('/', (req, res) => {
  res.render('main', { navbar: 'navbar' });
});

router.get('/inicio/form', (req, res) => {
  res.render('registrar_persona', { navbar: 'navbar' });
});

router.get('/inicio/entrada', (req, res) => {
  res.render('registrar_entrada', { navbar: 'navbar' });
});

router.get('/inicio/ingreso', (req, res) => {
  res.render('ver_ingresos', { navbar: 'navbar' });
});



//RUTAS APIS

router.post('/registrar/usuario', (req, res) => {
  const cuerpo = req.body;
  try{
    pool.query(`CALL insertar_usuario(${cuerpo.cedula},'${cuerpo.nombre}',${cuerpo.edad},${cuerpo.telefono},'${cuerpo.sexo}',${cuerpo.tipo})`)
    res.json(0)
  }catch(e){
    console.log(e)
    res.json(0)
  }

});


module.exports = router;
