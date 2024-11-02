//llamamos a nuestro audtehnticador de jwt personalizado por nosotros
const auth=require('../../autenticacion/index');
function chequearAutenticacion(req, res, next) {
    auth.chequearToken.confirmarToken(req);
    next();
}

module.exports = chequearAutenticacion;