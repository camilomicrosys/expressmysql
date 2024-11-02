const express = require('express');
// Este es un archivo personalizado que creamos para las respuestas exitosas o erradas
const respuesta = require('../../red/respuestas');
// Ese index requiere al controlador así que ya tiene al controlador acá
const controlador = require('./index');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticacion
 *   description: API para la gestión de autenticación
 */

/**
 * @swagger
 * /api/jwt/login:
 *   post:
 *     tags:
 *       - Autenticacion  # Asegúrate de que esto esté presente
 *     summary: Iniciar sesión con credenciales de usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inicio de sesión exitoso, se devuelve el token.
 *       401:
 *         description: Credenciales inválidas.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/login', async (req, res) => {
    const data = req.body;

    try {
        // Esta función me retornaría el token
        const token = await controlador.login(data.usuario, data.password);
        respuesta.success(req, res, token, 201);
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});

module.exports = router; 
