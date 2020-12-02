require('./config/config');
const express = require('express');
const mongoose = require ( 'mongoose') ;   
const  bodyParser  = require ('body-parser');  
const app = express();

//  analizar la aplicación / x-www-form-urlencoded
app.use(bodyParser.urlencoded({  extended: false }));
 
//  analizar la aplicación / json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  //send envia texto en html
res.send('<h1>Aqui primeros pasos calando un servidor REST</h1>');
});

app.use(require('./routes/usuario'));
app.use(require('./routes/categoria'));

//Esta es la funcion responsable de la conexion de la aplicacion a la base de datos de forma OK
 mongoose.connect('mongodb://localhost:27017/cafeteria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
 },
  (err, res) => {
  if (err) throw err;
  console.log('Base de datos Online');

});

 //la aplicacion escucha en el puerto 3000
app.listen(process.env.PORT, () =>{
console.log('El servidor esta en linea en el puerto 3000');
});

//codigo para un simple servidor rest