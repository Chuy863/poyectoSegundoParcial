const express = require('express');
const _ = require('underscore');
const app = express();
const Producto = require('../models/producto');

app.get('/producto', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Producto.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre email')
    .populate('categoria', 'nombre')
    .exec((err, productos) => {
        if(err){
            return res.status(400).json({
                ok: false, 
                msg: 'Ocurrio un error al listar los productos',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Productos listados con exito',
            conteo: productos.length,
            productos
        });
    });
});

app.post('/producto', (req, res) => {
    let pro = new Producto({
        nombre: req.body.nombre, 
        precioUni: req.body.precioUni,
        categoria: req.body.categoria,
        disponible: req.body.disponible,
        usuario: req.body.usuario
    });
    pro.save((err, proDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un producto',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Producto insertado con exito',
            proDB
        });
    });
});
        app.put('/producto/:id', function(req, res){
            let id =  req.params.id;
            let body = _.pick(req.body, ['nombre', 'precioUni']);

            Producto.findByIdAndUpdate(id, body,{new: true, runValidators: true, context: 'query'},
            (err, proDB) =>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                  });
            }

            res.json({
                ok: true,
                msg: 'Producto actualizado con exito',
                producto:proDB
        });
     });
});
module.exports = app;