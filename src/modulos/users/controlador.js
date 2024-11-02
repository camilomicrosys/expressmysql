const db=require('../../DB/mysql');
//llalammos la authenticacion que creamos
const auth=require('../auth/index');
//tabla de la db
const TABLA='users';



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

async function usarioEspecifico(id){
    var respuesta=db.unDato(TABLA,id);
    return respuesta;
}

//aca se hace para crear un usuario y asu vez crear en tabla auth primero creamos el usuario obtenemos el id en esa respuesta de ese json
//cuand se crea siempre nos retrna datos y el id creado y ya luego consumimos la de  actualizar o crear el auth
async function agregarDato(data){
    const usuario={
        id:data.id,
        nombre:data.nombre,
        activo:data.activo
    };
    //creamos el usaurio en tabla users y obtenemos el id creado para luego pasarlo a tabla  auth
    const respuesta= await db.agregarDato(TABLA,usuario);
   //creamos una bandera
    $insertId=0;
    //primero validamos si lo que manda el usuario en id es cero entonces es creacion sinoa ctualizacion
    if(data.id==0){
         insertId=respuesta.insertId;
    }else{
        insertId=data.id;
    }

    //bandera
    var respuesta2='';
    //ahora validamos si el usaurio me manda usuario o pass
    if(data.usuario|| data.password){
     
    //esta agregar dato es la funcion del principio de este archivo que solo recibe data
    //auth viene de la importancion de autehmticacion que creamos al inico de este script esatria la ruta a ese archivo y ses agregar dato esd e alla para crearlo en la tabla auth
     const respuesta2=   await  auth.agregarDato({
                id:insertId,
                usuario:data.usuario,
                password:data.password

            });
    }

    return respuesta2;

}

function actualizarDato(data){
    return db.actualizarDato(TABLA,data);
}

function eliminarUusuario(id){
  
    return db.eliminar(TABLA, id);
}
//exportamos las funciones
return{
    todos,
    usarioEspecifico,
    eliminarUusuario,
    agregarDato,
    actualizarDato
}
   
}