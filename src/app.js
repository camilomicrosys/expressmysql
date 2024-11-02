const express=require('express');
const config=require('./config');
//estos para la documentacion de swaager
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

//se instala con npm para permitir cors npm intall cors
const cors = require('cors');

//traemos las rutas
//esta es la de jwt
const authjwt=require('./modulos/auth/routes');
const users=require('./modulos/users/routes');
const libros=require('./modulos/libros/routes');

const app=express();

//llamamos propio de node al isntalar npm intall cors llamamos esto y ya habilita cors
// Middleware para permitir CORS
app.use(cors());
//esta siempre va para que se pueda mandar los datos del json raw desde postaman e insertarlos en la db mysql
// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Versión de OpenAPI
        info: {
            title: 'API de Mi Aplicación',
            version: '1.0.0',
            description: 'Documentación de la API para mi aplicación',
        },
        servers: [
            {
                url: `http://localhost:${config.app.port}`, // URL del servidor
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./modulos/auth/routes.js','./modulos/users/routes.js', './modulos/libros/routes.js'], 
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.set('port',config.app.port);


//esta es la ruta para autenticar con jwt el login
app.use('/api/jwt',authjwt);
//esta la ruta de usuarios en carpeta useres
app.use('/api/users',users);
//ruta de libros
app.use('/api/libros',libros); 


module.exports=app;
