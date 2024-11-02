const express=require('express');
const config=require('./config');
//se instala con npm para permitir cors npm intall cors
const cors = require('cors');


const app=express();

//llamamos propio de node al isntalar npm intall cors llamamos esto y ya habilita cors
// Middleware para permitir CORS
app.use(cors());
//esta siempre va para que se pueda mandar los datos del json raw desde postaman e insertarlos en la db mysql
// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json());


app.set('port',config.app.port);





module.exports=app;