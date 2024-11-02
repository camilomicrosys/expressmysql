const express = require('express');
//este es un archivo personalizado que creamos para las respuestas exitosas o erradas
const respuesta= require('../../red/respuestas');
//ese index requiere al controlador asi que ya tiene al controlador aca
const controlador=require('./index');

const router = express.Router();
//adicionamos el asyn y await por que el modelo para esto que es de base de datos 
//retorna una promesa



//ruta para crear un usuario
router.post('/login', async (req, res) => {
    const data = req.body;

    try {
        //esta funcion me retornaria el token
        const token = await controlador.login(data.usuario,data.password);
        respuesta.success(req, res, token, 201);
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});



module.exports = router; // Exporta directamente el router