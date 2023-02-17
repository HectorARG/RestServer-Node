const { Router } = require('express');
const { check } = require('express-validator');

/* middlewares personalizados */
const { validarJWT, validarCampos, tieneRole } = require('../middlewares');
/* Helpers personalizados */
const { existeCategoriaPorID } = require('../helpers/validarCategoria');

const { 
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete,
    categoriaGetAll,
 } = require('../controllers/categoria');


const router = Router();

router.get('/', validarJWT, categoriaGetAll);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom( existeCategoriaPorID ),
    validarCampos
], categoriaGet);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriaPost);

router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom( existeCategoriaPorID ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriaPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID Valido').isMongoId(),
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorID ),
    validarCampos
], categoriaDelete);

module.exports = router;