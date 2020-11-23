const express = require('express');
const app = express();

//la constante app es constante servidor la que se encarga de procesar todo, y con un . se invocan las funciones
//request es lo que manda el cliente y respond es lo que le respondemos al cliente
app.get('/usuario', function (req, res) {
  //send envia texto en html
res.json({
  ok:'200',
  mensaje:'Usuario consultado con exito'
});
});

app.post('/usuario', function (req, res) {
  let nombre = req.body.nombre;
  let body = req.body;
  
  if(nombre === undefined){
    res.status(400).json({
    ok: 400,
    mensaje:'Favor de enviar el valor del nombre'
    });
  }else{
    res.json({
      ok:'200',
      mensaje:'Tu usuario fue insertado con exito',
      body:body
      });
  }
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