// Esto es un archivo de configuración personalizado para las respuestas de exitoso o error
exports.success = (req, res, mensaje, status) => {
    const statusCode = status || 200;
    const mensajeOk = mensaje || '';

    res.status(statusCode).send({
        error: false,
        status: statusCode,
        data: mensajeOk
    });
};

exports.error = (req, res, mensaje, status) => {
    const statusCode = status || 500;
    const mensajeError = mensaje || 'Error interno de nuestro servidor';
    // Imprimir el error en la consola
    console.error(mensaje);
    
    res.status(statusCode).send({
        error: true, // Esto debería ser true para indicar un error
        status: statusCode,
        data: mensajeError
    });
};
