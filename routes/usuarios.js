const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

/* middlewares personalizados */
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');

/* Helpers personalizados */
const { 
    esRoleValido, 
    existeEmail, 
    existeUsuarioPorID 
} = require('../helpers/db-validators');

/* Controladores */
const { 
    usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosDelete, 
    usuariosPatch 
} = require('../controllers/usuarios');


router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    check('email', 'El email es obligatorio').isEmail(),
    check('email'). custom( existeEmail ),
    // check('rol', 'No es un rol valido').isIn(['USER_ROLE', 'ADMIN_ROLE']),
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarCampos
], usuariosDelete);

router.patch('/:id', usuariosPatch);



module.exports = router;