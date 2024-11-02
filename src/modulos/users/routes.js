const express = require('express');
const seguridad = require('./seguridad');  // Middleware de seguridad que verifica el token JWT
const sesionUsuarioJWTMiddleware = require('../../autenticacion/sesionUsuarioJWTMiddleware');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para la gestión de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       500:
 *         description: Error en el servidor
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
 * /api/users/datos-usuario/autenticado:
 *   get:
 *     summary: Obtener los datos del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado
 *       401:
 *         description: Usuario no autenticado
 */
router.get('/datos-usuario/autenticado', seguridad, sesionUsuarioJWTMiddleware.obtenerDatosUsuario, (req, res) => {
    const usuario = req.usuario;
    res.json(usuario);
});

/**
 * @swagger
 * /api/users/usuario/{id}:
 *   get:
 *     summary: Obtener un usuario específico por ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/usuario/:id', seguridad, async (req, res) => {
    const id = req.params.id;

    try {
        const usuario = await controlador.usuarioEspecifico(id);
        respuesta.success(req, res, usuario, 200);
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});

/**
 * @swagger
 * /api/users/crear:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               activo:
 *                 type: boolean
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error en el servidor
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
 * /api/users/update:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Users]
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
 *               nombre:
 *                 type: string
 *               activo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error en el servidor
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
 * /api/users/usuario/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/usuario/:id', seguridad, async (req, res) => {
    const id = req.params.id;

    try {
        await controlador.eliminarUsuario(id);
        const message = 'Usuario eliminado exitosamente';
        res.json({ message });
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});

module.exports = router;
