//llamamos la libreria que insatlamos npm install jsonwebtoken  todo este archivo que genera el token lo llamamos en modulos/auth que 
//alla es donde estamos haciendo las autenticaciones
const jwt=require('jsonwebtoken');
//requerimos el secret que creamos en nuestroa rchivo config.js que es nuestro
const config=require('../config');
//sacamos la secreta del config.js nuetsro 
const secret=config.jwt.secret;

//este es el que genera el token al usuario y se le da su duracion
function asignarToken(data){
    //este jwt.sign es propio de la libreria jswt, aca retornamos el token asi queda sin vencimiento
    //return jwt.sign(data,secret);
    //y asi le ponemos que se venza el token cada x tiempo en segundos
    const duracionToken=3600;
    return jwt.sign(data, secret, { expiresIn: duracionToken });

}

//creamos otra funcion para verificar token lleva la otra funcion de abajo de chekear toke tambien
//esto solo de verificar token lleva los 4 metodos de aca asia abajo
function verificarToken(token){
    //esta es propia de jwt
    return jwt.verify(token,secret);
}

const chequearToken = {
    confirmarToken: function (req) {
        const decodificado = decodificarCabecera(req);
    }
};

function obtenerToken(autorizacion){
    //sino viene autorizacion es por que no pusieron token
    if(!autorizacion){
      throw new Error('No viene token');
     } 

     if(autorizacion.indexOf('Bearer')=== -1){
        throw new Error('Formato invalido');
     }

     //si llego hasta aca viene todo bien para validar
     let token=autorizacion.replace('Bearer ','');
     //devolvemos el token sin bearer
     return token;

}
//esta hace parte de las 2 anterioes de verificar token y chequear token
function decodificarCabecera(req) {
    const autorizacion = req.headers.authorization || '';
    const token = obtenerToken(autorizacion);
    const decodificado = verificarToken(token);
    return decodificado;
}


module.exports={
    asignarToken,
    chequearToken
    
}