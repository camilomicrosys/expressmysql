const db=require('../../DB/mysql');
//llalammos la authenticacion que creamos
const auth=require('../auth/index');
//tabla de la db
const TABLA='libros';



//exporamos las funciones creadas
module.exports= function(dbInyectada){

    let db=dbInyectada;

    if(!db){
        db=require('../../DB/mysql');
    }

//a este metodo lo acceden en las rutas que seria la vista y alla se hace el then de la respuesta de la promesa
async function todos(){
    //como esto en el archivo DB/mysql
    var respuesta=await  db.todosLosDatos(TABLA);
    return respuesta
}

async function libroPorId(id){
    var respuesta=db.unDato(TABLA,id);
    return respuesta;
}

//aca se hace para crear un usuario y asu vez crear en tabla auth primero creamos el usuario obtenemos el id en esa respuesta de ese json
//cuand se crea siempre nos retrna datos y el id creado y ya luego consumimos la de  actualizar o crear el auth
async function agregarDato(data){
    const libro={
        titulo:data.titulo,
        autor:data.autor,
        anio_publicacion:data.anio_publicacion,
        estado:data.estado
    };
    //creamos el usaurio en tabla users y obtenemos el id creado para luego pasarlo a tabla  auth
    const respuesta= await db.agregarDato(TABLA,libro);

    return respuesta;
    

}

function actualizarDato(data){
    return db.actualizarDato(TABLA,data);
}

function eliminarLibro(id){
  
    return db.eliminar(TABLA, id);
}
//exportamos las funciones
return{
    todos,
    libroPorId,
    eliminarLibro,
    agregarDato,
    actualizarDato
}
   
}