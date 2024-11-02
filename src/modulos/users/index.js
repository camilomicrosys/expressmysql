//este va ser un constructor que tendra la base de datos la conexion
const db=require('../../DB/mysql');
const ctrl=require('./controlador');

//exportamos la conexion
module.exports=ctrl(db);