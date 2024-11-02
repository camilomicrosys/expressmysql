//etsa la hice yo como en laravel para saber los datos del usaurio autenticado con el jwt
//y en las rutas de aca de usaurio la llamoeste midelware para sacar los datos
//este me da los datos del usuario autenticado en tabla auth, de alli saco el id que es el id del usario y 
//ya con eso podria implemnetar apis para sacar nuevos datos
const jwt = require('jsonwebtoken');
const config = require('../config');

function obtenerDatosUsuario(req, res, next) {
    try {
        // Obtener el token de la solicitud
        const autorizacion = req.headers.authorization || '';
        if (!autorizacion || autorizacion.indexOf('Bearer') === -1) {
            return res.status(401).json({ error: 'Token no proporcionado o en formato incorrecto' });
        }
        const token = autorizacion.replace('Bearer ', '');

        // Verificar el token y obtener los datos del usuario
        const datosUsuario = jwt.verify(token, config.jwt.secret);

        // Adjuntar los datos del usuario a la solicitud para que estén disponibles en las rutas
        req.usuario = datosUsuario;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
}

module.exports = {
    obtenerDatosUsuario
};
