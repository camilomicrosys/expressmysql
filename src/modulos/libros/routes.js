const express = require('express');
// Middleware personalizado para proteger las rutas con JWT
const seguridad = require('./seguridad');

// Middleware para obtener los datos del usuario autenticado mediante el token
const sesionUsuarioJWTMiddleware = require('../../autenticacion/sesionUsuarioJWTMiddleware');

// Archivo personalizado para manejar respuestas exitosas o errores
const respuesta = require('../../red/respuestas');

// Importa el controlador principal
const controlador = require('./index');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Libros
 *     description: API para la gestión de libros
 */

/**
 * @swagger
 * /api/libros:
 *   get:
 *     summary: Obtener todos los registros de libros.
 *     tags: [Libros]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de libros obtenida exitosamente.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/', seguridad, async (req, res) => {
    try {
        const todos = await controlador.todos();
        respuesta.success(req, res, todos, 200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
});

/**
 * @swagger
 * /api/libros/datos-usuario/autenticado:
 *   get:
 *     summary: Obtener los datos del usuario autenticado.
 *     tags: [Libros]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado.
 *       401:
 *         description: Usuario no autenticado.
 */
router.get('/datos-usuario/autenticado', sesionUsuarioJWTMiddleware.obtenerDatosUsuario, (req, res) => {
    const usuario = req.usuario;
    res.json(usuario);
});

/**
 * @swagger
 * /api/libros/libro/{id}:
 *   get:
 *     summary: Obtener un libro específico por ID.
 *     tags: [Libros]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del libro a obtener.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Libro encontrado exitosamente.
 *       404:
 *         description: Libro no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/libro/:id', seguridad, async (req, res) => {
    const id = req.params.id;

    try {
        const libro = await controlador.libroPorId(id);
        if (libro) {
            respuesta.success(req, res, libro, 200);
        } else {
            respuesta.error(req, res, 'Libro no encontrado', 404);
        }
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});

/**
 * @swagger
 * /api/libros/crear:
 *   post:
 *     summary: Crear un nuevo libro.
 *     tags: [Libros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               anio_publicacion:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Libro creado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/crear', seguridad, async (req, res) => {
    const data = req.body;

    try {
        const result = await controlador.agregarDato(data);
        respuesta.success(req, res, result, 201);
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});

/**
 * @swagger
 * /api/libros/update:
 *   put:
 *     summary: Actualizar un libro existente.
 *     tags: [Libros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               anio_publicacion:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Libro actualizado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error en el servidor.
 */
router.put('/update', seguridad, async (req, res) => {
    const data = req.body;

    try {
        const result = await controlador.actualizarDato(data);
        respuesta.success(req, res, result, 200);
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});

/**
 * @swagger
 * /api/libros/libro/{id}:
 *   delete:
 *     summary: Eliminar un libro por ID.
 *     tags: [Libros]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del libro a eliminar.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Libro eliminado exitosamente.
 *       404:
 *         description: Libro no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.delete('/libro/:id', seguridad, async (req, res) => {
    const id = req.params.id;

    try {
        const result = await controlador.eliminarLibro(id);
        if (result) {
            res.json({ message: 'Libro eliminado exitosamente' });
        } else {
            respuesta.error(req, res, 'Libro no encontrado', 404);
        }
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});

/**
 * @swagger
 * /api/libros/buscar:
 *   post:
 *     summary: Buscar libros por una palabra clave.
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               palabra:
 *                 type: string
 *                 description: Palabra clave para buscar en los libros.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de libros que coinciden con la búsqueda.
 *       400:
 *         description: Solicitud inválida.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/buscar', async (req, res) => {
    const { palabra } = req.body;

    try {
        const resultados = await controlador.buscarLibros(palabra);
        respuesta.success(req, res, resultados, 200);
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});

module.exports = router;
