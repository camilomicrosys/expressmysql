const express=require('express');
const config=require('./config');
//se instala con npm para permitir cors npm intall cors
const cors = require('cors');

//traemos las rutas
//esta es la de jwt
const authjwt=require('./modulos/auth/routes');
const users=require('./modulos/users/routes');

const app=express();

//llamamos propio de node al isntalar npm intall cors llamamos esto y ya habilita cors
// Middleware para permitir CORS
app.use(cors());
//esta siempre va para que se pueda mandar los datos del json raw desde postaman e insertarlos en la db mysql
// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json());


app.set('port',config.app.port);


//esta es la ruta para autenticar con jwt el login
app.use('/api/jwt',authjwt);
//esta la ruta de usuarios en carpeta useres
app.use('/api/users',users);


module.exports=app;
