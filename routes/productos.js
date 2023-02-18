const { Router } = require('express');
const { check } = require('express-validator');

/* middlewares personalizados */
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
/* Helpers personalizados */
const { existeProductoPorID } = require('../helpers/db-validators');

const { 
    productosGetAll, 
    productoGet, 
    productoPost, 
    productoPut, 
    productoDelete
 } = require('../controllers/productos');


const router = Router();

router.get('/', validarJWT, productosGetAll);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom( existeProductoPorID ),
    validarCampos
], productoGet);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID Valido').isMongoId(),
    validarCampos
], productoPost);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom( existeProductoPorID ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID Valido').isMongoId(),
    validarCampos
], productoPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorID ),
    esAdminRole,
    validarCampos
], productoDelete);

module.exports = router;