const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

/* Controladores */
const { 
    usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosDelete, 
    usuariosPatch 
} = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    check('email', 'El email es obligatorio').isEmail(),
    check('rol', 'No es un rol valido').isIn(['USER_ROLE', 'ADMIN_ROLE']),
    validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/:id', usuariosDelete);

router.patch('/:id', usuariosPatch);



module.exports = router;