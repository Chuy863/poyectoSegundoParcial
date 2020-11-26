const express = require('express');
const Usuario = require('../models/usuario');
const app = express();

//la constante app es constante servidor la que se encarga de procesar todo, y con un . se invocan las funciones
//request es lo que manda el cliente y respond es lo que le respondemos al cliente
app.get('/usuario', function (req, res) {
  //send envia texto en html
  res.json({
  ok: 200,
  mensaje:'Usuario consultado con exito'
  });
});

app.post('/usuario', function (req, res) {
  let body = req.body;
  let usr = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: body.password
  });

  usr.save((err, usrDB) => {
    if(err){
      return res.status(400).json({
        ok: false,
        msg: 'Ocurrio un error',
        err
      });
    }

    res.json({
      ok: true,
      msg: 'Usuario insertado con exito',
      usrDB
    });
  });

});

app.put('/usuario/:id/:nombre', function (req, res) {
  let id = req.params.id;
  let nombre = req.params.nombre;
    
  res.json({
    ok:'200',
    mensaje:'Usuario actualizado con exito',
    id: id,
    nombre:nombre
      });
  });

app.delete('/usuario/:id', function(req, res){
  let id = req.params.id;
  res.json({
    ok:200,
    mensaje: 'Usuario eliminado con exito',
    id: id
  });
});
module.exports = app;