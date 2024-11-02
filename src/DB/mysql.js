//este archivo es como si fuera el modelo y el controlador es quien lo llama
//instaamos mysql npm install mysql y ya aca se llama
const mysql = require('mysql');
const config = require('../config');

const dbconfig={
    host:config.mysql.host,
    user:config.mysql.user,
    password:config.mysql.password,
    database:config.mysql.database


}

let conexion;

function conexionMysql(){
    conexion=mysql.createConnection(dbconfig);
    //validamos si conecta o si hay un error
    conexion.connect((err)=>{
        if(err){
           console.log('error al conectar base de datod db error ',err);
           //si no se conecto intentamos reconectar
           setTimeout(conexionMysql,200);
        }else{
          console.log('base de datos conectada exitosamente');
        }
    });

    conexion.on('error',err=>{
        console.log('error',err);
        //si se pierde conexion intentamos reconectarlo
        if(err.code=='PROTOCOL_CONNECTION_LOST'){ 
            conexionMysql();
              
        }else{
             throw err;
        }
    })
}
//llamamos la funcion que acabamos de crear arribita para que se conecte a la base de datos
conexionMysql();

function todosLosDatos(tabla) {
    return new Promise((resolve,reject)=>{
         conexion.query(`select * from ${tabla}`,(error,result)=>{
            //si hay un error entrga el error sino entrega los datos del result
            return error?reject(error):resolve(result);
                   
         });
    });
}

function unDato(tabla, id) {
    return new Promise((resolve,reject)=>{
        conexion.query(`select * from ${tabla} where id=${id}`,(error,result)=>{
           //si hay un error entrga el error sino entrega los datos del result
           return error?reject(error):resolve(result);
                  
        });
   });
}

//se pone sert ? y despues del query data que viene en un objeto raw json desde postman
//ESTA SE USA PARA insertar un registro y se reutiliza con ese on duplicate key para actualizar
//al auth sino  existe es por que esta creando un registro si ya existe actualzia el id por que es una actualziacion solo es para el auth de resto aca abajo tengo para metodo update es por que en este el reutiliza el insert y update ara 
//auth  
function agregarDato(tabla, data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`;
        const values = [data, data];
        conexion.query(query, values, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

//como la data viene con el json de postman raw json con los datos en mismo orden se saca data y y el id para que se inserte en la base de datos bein
function actualizarDato(tabla, data) {
    return new Promise((resolve, reject) => {
        const id = data.id;
        delete data.id; // Removemos el ID del objeto de datos para no actualizarlo
        const query = `UPDATE ${tabla} SET ? WHERE id = ?`;
        conexion.query(query, [data, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}


function eliminar(tabla, id) {
    return new Promise((resolve,reject)=>{
        conexion.query(`DELETE FROM ${tabla} WHERE id=${id}`,(error,result)=>{
           //si hay un error entrga el error sino entrega los datos del result
           return error?reject(error):resolve(result);
                  
        });
   });
}

//creamos esta llamada query para generar consultas personalizadas esta se usa en modules/auth
function query(tabla, consulta) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (error, result) => {
            // Si hay un error, entregamos el error; de lo contrario, entregamos los datos del resultado
            return error ? reject(error) : resolve(result);
        });
    });
}

//este para el buscador de libros
function buscarLibros(tabla, valor) {
    return new Promise((resolve, reject) => {
        // Validamos que el valor no esté vacío
        if (!valor) {
            return reject(new Error('El valor de búsqueda no puede estar vacío.'));
        }

        // Construimos la consulta SQL para buscar en los campos relevantes
        const query = `SELECT * FROM ${tabla} WHERE 
            titulo LIKE ? OR 
            autor LIKE ? OR 
            anio_publicacion LIKE ? OR 
            estado LIKE ?`;
        
        // Usamos el valor buscado con comodines
        const valorBuscado = `%${valor}%`; // Para coincidencias parciales

        // Ejecutamos la consulta con los mismos valores para cada campo
        conexion.query(query, [valorBuscado, valorBuscado, valorBuscado, valorBuscado], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}



// Exportamos todos los métodos
module.exports = {
    todosLosDatos,
    unDato,
    agregarDato,
    eliminar,
    actualizarDato,
    query,
    buscarLibros
}
