const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

/* middlewares personalizados */
const { validarCampos } = require('../middlewares/validar-campos');
/* Controllers */
const { login } = require('../controllers/auth');

/* Rutas */
router.post('/login', [
    check('email', 'El Correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

module.exports = router;

