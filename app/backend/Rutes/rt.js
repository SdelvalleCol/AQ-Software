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

//Registrar usuario
router.post('/registrar/usuario', (req, res) => {
  const cuerpo = req.body;
  try {
    pool.query(`SELECT ver_usuario(${cuerpo.cedula})`, (error, resultado) => {
      const respuesta = resultado[0];
      const valor = JSON.parse(respuesta["ver_usuario(" + cuerpo.cedula + ")"]);
      const id_final = valor["persona_id"]
      if (id_final == null) {
        pool.query(`CALL insertar_usuario(${cuerpo.cedula},'${cuerpo.nombre}',${cuerpo.edad},${cuerpo.telefono},'${cuerpo.sexo}',${cuerpo.tipo})`)
      }else{
        res.json("Usuario ya creado")
      }
    })
  } catch (e) {
    console.log(e)
    res.json(0)
  }
});

//Registrar visita persona
router.post('/registrar/usuario/visita', (req, res) => {
  const cuerpo = req.body;
  try {
    pool.query(`SELECT ver_usuario(${cuerpo.cedula})`, (error, resultado) => {
      const respuesta = resultado[0];
      const valor = JSON.parse(respuesta["ver_usuario(" + cuerpo.cedula + ")"]);
      const id_final = valor["persona_id"]
      const tipo = valor["tipo_persona"]
      if (id_final != null) {
        pool.query(`CALL insertar_registro(${id_final},${tipo},${0})`, (error2, resultado2) => {
          if (error2) {
            console.log(error2)
          } else {
            res.json("Yeah")
          }
        })
      } else {
        res.json("No existe")
      }
    })
  } catch (e) {
    console.log(e)
    res.json(0)
  }
});

//Registrar visita vehiculo y usuario
router.post('/registrar/vehiculo/visita', (req, res) => {
  const cuerpo = req.body;
  try {
    pool.query(`SELECT ver_usuario(${cuerpo.cedula})`, (error, resultado) => {
      const respuesta = resultado[0];
      const valor = JSON.parse(respuesta["ver_usuario(" + cuerpo.cedula + ")"]);
      const id_final = valor["persona_id"]
      const tipo = valor["tipo_persona"]
      if (id_final != null) {
        pool.query(`CALL insertar_registro_coche('${cuerpo.matricula}','${cuerpo.ciudad}',${cuerpo.cedula})`, (error2, resultado2) => {
          if (error2) {
            res.json("ERROR")
          } else {
            pool.query(`CALL insertar_registro(${id_final},${tipo},'${cuerpo.matricula}')`, (error3, resultado3) => {
              if (error3) {
                console.log(error3)
              } else {
                res.json("Exito")
              }
            })
          }
        })

      } else {
        res.json("No existe")
      }
    })
  } catch (e) {
    console.log(e)
    res.json(0)
  }
});


module.exports = router;
