const db=require('../../DB/mysql');
//tabla de la db
const TABLA='auth';
//importamos la libreria npm install bcrypt  de encriptar contraseñas
const bcrypt =require('bcrypt');
//llamamos lo que configuramos de la autenticacion jwt que es la que crea el token
const autenticacionJWT=require('../../autenticacion/index');



//exporamos las funciones creadas
module.exports= function(dbInyectada){

    let db=dbInyectada;

    if(!db){
        db=require('../../DB/mysql');
    }


//solo hicimos el de agregar un auth  esto es para agregar los datos de la tabla auth
//se agrega el async por que cuando caca abajo encriptamos la contraseña ella es promesa entonces se espera que encrypt responda ya que encript es una promesa
async function agregarDato(data){

   const authData={
     id:data.id
   }

   if(data.usuario){
     authData.usuario=data.usuario;
   }

   if(data.password){
    //encriptamos la contraseña con la libreria que llemamos al inicio de este script que la insatlamos con npm
    //el 5 es para que la encripte 5 veces y se pone await para que espere
     authData.password=await bcrypt.hash(data.password.toString(),5);
   }



    return db.agregarDato(TABLA,authData);
}

async function login(usuario,password){
    //query es una funcion que creamos en DB/MYSQL ahi donde estamos montando todas las consultas
    //mas no es propia de express, es nuestra
    const results = await db.query(TABLA,{usuario:usuario});
    if(results.length === 0) {
        throw new Error('Usuario no encontrado');
    }
    const data = results[0];
    
    //validamos con la libreria encrypt que insatlamos con npm sea misma clave
    return bcrypt.compare(password, data.password).then(resultado=>{
        if(resultado === true){
            
            //generamos un token data es la que tenemos ahi de los datos obtenidos y creamos una ruta que tiene 
            //los datos del suaurio auth aca se crea en esa data cuando uno consulta los datos del propietario del token salen de aca es como si esto creara una sesion
            return autenticacionJWT.asignarToken({data});
        } else {
            throw new Error('Contraseña incorrecta');
        }
    });
}



//exportamos las funciones
return{
    
    agregarDato,
    login
    
}
   
}