const express = require('express');
//agregamos esto esto se creo personalizado para proteger las rutas 
//que se este autenticado con jwt para poder acceder
const seguridad=require('./seguridad');
//este lo cree yo tambien para obtener los datos del usaer auth con el token como laravel
const sesionUsuarioJWTMiddleware = require('../../autenticacion/sesionUsuarioJWTMiddleware');

//este es un archivo personalizado que creamos para las respuestas exitosas o erradas
const respuesta= require('../../red/respuestas');
//ese index requiere al controlador asi que ya tiene al controlador aca
const controlador=require('./index');

const router = express.Router();
//adicionamos el asyn y await por que el modelo para esto que es de base de datos 
//retorna una promesa



//ruta para obtener todos los registros de la db se les pasa este para porteger las rutas seguridad es el archivo que creamos aca en esta carpeta seguirdad.js es 
//el que valida si tiene token de jwt valido o no, solo deja acceder si viene con el token valido
router.get('/', seguridad, async (req, res) => {
    try {
        const todos = await controlador.todos();
        respuesta.success(req, res, todos, 200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
});


// Ruta para obtener los datos del usuario autenticado
router.get('/datos-usuario/autenticado', sesionUsuarioJWTMiddleware.obtenerDatosUsuario, (req, res) => {
    // Los datos del usuario autenticado estarán disponibles en req.usuario
    const usuario = req.usuario;
    res.json(usuario);
});

//ruta obtener usuario especifico
router.get('/cliente/:id',seguridad, async  (req, res) => {
    const id=req.params.id;

    //metemos todo en tr catch para validar que todo este melo
    try
    {
        //obtenemos todos los clientes de la base de datos
         //como este de todos retorna una promesa en el modelo por eso se accede asi en la ruta
        const todos=await controlador.usarioEspecifico(id).then((datosrecibidos)=>{
        //si accedemos a esoto es la misma res.send la misma cosa
         respuesta.success(req,res,datosrecibidos,200);
    });

    }catch(err){

        respuesta.error(req,res,err,500);
    }
    
    
});

//ruta para crear un usuario
router.post('/cliente/crear',seguridad, async (req, res) => {
    const data = req.body;

    try {
        const result = await controlador.agregarDato(data);
        respuesta.success(req, res, result, 201);
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});

//para actualizar un usuario
router.put('/cliente/update',seguridad, async (req, res) => {
    const data = req.body;

    try {
        const result = await controlador.actualizarDato(data);
        respuesta.success(req, res, result, 201);
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});




//ruta para eliminar
router.delete('/cliente/:id',seguridad, async  (req, res) => {
    const id=req.params.id;

    //metemos todo en tr catch para validar que todo este melo
    try
    {
        //obtenemos todos los clientes de la base de datos
         //como este de todos retorna una promesa en el modelo por eso se accede asi en la ruta
        const todos=await controlador.eliminarUusuario(id).then(()=>{
        //mandamos una respuesta normalita de node js express
        const message = 'Usuario eliminado exitosamente';

        // Enviar respuesta JSON con la propiedad message
        res.json({ message });
    });

    }catch(err){

        respuesta.error(req,res,err,500);
    }
    
    
});




module.exports = router; // Exporta directamente el router
