# Nombre del Proyecto

Backend nodejs con express para gestion de libros con autenticacion de usuarios JWT

## Instalación

Instrucciones sobre cómo instalar y configurar el proyecto.
-Descargar e intalar xampp o algun gestor de base de datos sql tipico siguiente siguiente
-abrir xampp y clikear en boton start de apache y mysql esperar a que este en verde 
-en misma ventada dar clik en admin de la base de datos se abrira phpmyadmin getsor de base de datos
-crear una base de datos llamada backendjuju
-importar el script que esta en este proyecto en la carpeta backuop-db

-tener instalado node js
-instalacion de proyecto node js entrar en al cosnola en el proyecto ejecturar npm init  y npm install
-luego entrar a la carpta src y ejecutar nodemon index.js ya estaria levantado el servidor y conetacdo 
a la db

-puedes importar la coleccion de postan armada esta en este proecto en coleccion-postamn
-o guiarte con las rutas para abrir swager en la ruta http://localhost:3000/api-docs
-salen 3 tipos autenticacion lo haras con este usuario y pass :  usuario=mariaUser pass=1234 la cual generara el token jwt para continuar consumiendo las demas apis pasando en le header  el Bearer Token
-esta el modulo usuarios el cual seria para crear los usuarios que se podran loguear con el api, con su respectivo crud
-esta el modulo de libros el cual tiene su respectivo crud

-el archivo de configuracion de la db esta en src/config.js el cual hace su respectiva conexion en db



## Uso

Loguearse con el api de autenticacion para consumir las demas apis, las cuales pedira en el header el berarer token

-podras usar la api de login, podras hacer crud de usaurios para interactuar con el api de login y las demas apis, esta tiene crud
-podras usar el api de gestion de libros con un crud



## Licencia

LPG
